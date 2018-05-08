var _ = require('underscore');


/**
	Initialises the standard view locals
*/

exports.initLocals = function (req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'About Us',		key: 'about',		pages: [
			{ label: 'What We Do',		subkey: 'whatwedo',	href: '/whatwedo' 		},
			{ label: 'Our Journey',		subkey: 'journey',		href: '/journey'	},
			{ label: 'Meet the Trustees',	subkey: 'trustees',		href: '/trustees' 	},
			{ label: 'Safeguarding',		subkey: 'safeguarding',	href: '/safeguarding' 		},
		] },
		{
			label: 'Branches', key: 'branches', pages: [
				{ label: 'Oxford',	subkey: 'oxfordbranch',		href: '/branches/oxford' 	},
				{ label: 'Durham',	subkey: 'durhambranch',		href: '/branches/durham' 	},
				{ label: 'Bristol',	subkey: 'bristolbranch',		href: '/branches/bristol' 	},
			],
		},
		{ label: 'Get Involved',	key: 'getinvolved',	pages: [
			{ label: 'For Tutors',		subkey: 'getinvolvedtutors',	href: '/getinvolvedtutors' },
			{ label: 'For Schools',		subkey: 'getinvolvedschools', 	href: '/getinvolvedschools' },
		] },
		{ label: 'Blog',		key: 'blog',		href: '/blog' },
		{ label: 'Apply Now',	key: 'n/a',			href: '/contact#apply' },
		{ label: 'Contact Us',		key: 'contact',		href: '/contact' },
		{ label: 'Support Us',		key: 'support',		href: '/support' },
	];

	locals.user = req.user;

	next();

};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function (req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};

	res.locals.messages = _.any(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;

	next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function (req, res, next) {

	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}

};
