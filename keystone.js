var travis = !(process.argv.indexOf('--travis') === -1);
if (!travis) {
	require('dotenv').load();
}

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var Nightwatch = require('nightwatch/lib/index.js');
var child_process = require('child_process');
var path = require('path');
var selenium = null;
var async = require('async');
var request = require('superagent');
var testing = !(process.argv.indexOf('--test') === -1);
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || '3000';

keystone.init({

	'name': 'Students4Students',
	'brand': 'Students4Students',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'model prefix': 's4s',
});

if (keystone.get('env') === 'production') {
	keystone.set('session store', 'connect-mongo');
}

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
	people: ['committee-members', 'trustees'],
	files: ['files', 'folders'],
	faqs: ['tutor-faqs', 'school-faqs'],
});

keystone.set('signin redirect', '/');

keystone.set('cloudinary secure', true);


if (!testing) {
	keystone.start();
} else {
	test();
}


function checkKeystoneReady (done) {
	async.retry({
		times: 10,
		interval: 3000,
	}, function (done, result) {
		console.log('Checking if KeystoneJS ready for request');
		console.log('http://' + host + ':' + port + '/keystone');
		request
			.get('http://' + host + ':' + port + '/keystone')
			.end(done);
	}, function (err, result) {
		if (!err) {
			console.log('tests: KeystoneJS Ready!');
			done();
		} else {
			console.log('tests: KeystoneJS does not appear ready!');
			done(err);
		}
	});
}

/*
 On some machines, selenium fails with a timeout error when nightwatch tries to connect due to a
 deadlock situation. The following is a temporary workaround that starts selenium without a pipe
 from stdin until this issue is fixed in nightwatch:
 https://github.com/nightwatchjs/nightwatch/issues/470
 */
function runSelenium (done) {
	console.log('tests: starting selenium server in background...');
	selenium = child_process.spawn('java',
		[
			'-jar',
			path.join(__dirname, 'tests/bin/selenium-server-standalone-2.53.0.jar'),
		],
		{
			stdio: ['ignore', 'pipe', 'pipe'],
		});
	var running = false;

	selenium.stderr.on('data', function (buffer)
	{
		var line = buffer.toString();
		if (line.search(/Selenium Server is up and running/g) !== -1) {
			running = true;
			done();
		}
	});

	selenium.on('close', function (code) {
		if (!running) {
			done(new Error('Selenium exited with error code ' + code));
		}
	});
}

function runNightwatch (done) {
	console.log('tests: starting tests...');

	try {
		Nightwatch.cli(function (argv) {
			Nightwatch.runner(argv, function () {
				console.log('tests: finished tests...');
				done();
			});
		});
	} catch (ex) {
		console.error('\nThere was an error while starting the nightwatch test runner:\n\n');
		process.stderr.write(ex.stack + '\n');
		done('failed to run nightwatch!');
	}
}

function runKeystone (cb) {
	console.log('tests: starting KeystoneJS...');

	keystone.start({
		onMount: function () {
			console.log('tests: KeystoneJS mounted Successfuly');
		},
		onStart: function () {
			console.log('tests: KeystoneJS Started Successfully');
			cb();
		},
	});
}

function test () {
	async.series([

		function (cb) {
			runKeystone(cb);
		},

		function (cb) {
			checkKeystoneReady(cb);
		},

		function (cb) {
			runSelenium(cb);
		},

		function (cb) {
			runNightwatch(cb);
		},

	], function (err) {
		var exitProcess = false;
		if (err) {
			console.error('tests: ' + err);
			exitProcess = true;
		}
		if (selenium) {
			selenium.kill('SIGHUP');
			exitProcess = true;
		}
		if (exitProcess) {
			process.exit();
		}
	});
}
