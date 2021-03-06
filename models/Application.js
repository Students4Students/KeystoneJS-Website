var keystone = require('keystone');
var Types = keystone.Field.Types;
var nodemailer = require('nodemailer');
var config = require('../mailConfig.js').config;
var transporter = nodemailer.createTransport(config);

var Application = new keystone.List('Application', {
	track: true,
});

Application.add({
	name: { type: String, required: true, initial: true },
	email: { type: Types.Email, required: true, initial: true },
	subject: { type: String, required: true, initial: true },
	year: { type: String, required: true, initial: true },
	college: { type: String, initial: true },
	university: { type: Types.Select, options: 'Oxford, Durham, Sandringham, Bristol', required: true, initial: true },
	experience: {
		type: Types.Textarea,
		required: true,
		initial: true,
		label: 'Please tell us about any experience you have teaching or working with children',
	},
	interest: {
		type: Types.Textarea,
		required: true,
		initial: true,
		label: 'What has made you interested in Students4Students?',
	},
	questions: {
		type: Types.Textarea,
		initial: true,
		label: 'Any questions for us?',
	},
	comments: {
		type: Types.Textarea,
		label: 'Comments (From S4S)',
	},
	status: {
		type: Types.Select,
		options: 'Complete, Training, Interview, Processing',
	},
});

Application.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Application.schema.post('save', function (application) {
	if (!this.wasNew) {
		console.log('An application was updated, not sending an email');
		return true;
	}
	if (process.env.TRAVIS) {
		console.log('Not sending email during testing');
		return true;
	}
	var message = 'You have recieved a new tutor application from ' + application.name + '.<br>'
		+ ' To see the details, <a href="https://www.students4students.org.uk/keystone/applications/' + application._id + '">click here.';

	var to;
	if (this.university === 'Oxford') {
		to = 'chair.oxford@students4students.org.uk, recruitment.oxford@students4students.org.uk';
	} else if (this.university === 'Durham') {
		to = 'chair.durham@students4students.org.uk, recruitment.durham@students4students.org.uk';
	} else if (this.university === 'Bristol') {
		to = 'chair.bristol@students4students.org.uk, recruitment.bristol@students4students.org.uk';
	} else if (this.university === 'Sandringham') {
		to = 'alex.astley@students4students.org.uk';
	} else {
		to = 'william.clare@students4students.org.uk, alex.astley@students4students.org.uk';
	}

	var mailOptions = {
		from: '"jakestockwin.co.uk" <noreply@jakestockwin.co.uk>', // sender address
		to: to,
		subject: 'S4S New Tutor Application', // Subject line
		html: message, // plaintext body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		console.log('New application recieved. Sending emails');
		if (err) {
			console.log('Error sending email:');
			console.log(err);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});
});

Application.defaultColumns = 'name, email, university, status';
Application.register();
