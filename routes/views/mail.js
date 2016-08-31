var nodemailer = require('nodemailer');

var config = require('../../mailConfig.js').config;

var transporter = nodemailer.createTransport(config);

exports = module.exports = function (req, res) {

	if (process.env.TRAVIS) {
		// If it's travis running tests, we shouldn't send emails out.
		console.log('Travis environment variable set, not sending email');
		res.statusCode = 200;
		res.end();
		return true;
	}

	var allowedEmails = [
		'alex.astley@students4students.org.uk',
		'tutor.liaison.officer@students4students.org.uk',
		'admin@students4students.org.uk',
	];

	if (allowedEmails.indexOf(req.body.to) === -1) {
		// Make some effort to stop anyone posting this address to send emails to anyone they like.
		console.log('Requested to send email to :' + req.body.to);
		console.log('This is not in the allowed emails list, so the email will not be sent.');
		res.statusCode = 403;
		res.end();
	}

	var message = 'You have recieved a new message from your website contact form.<br><br>'
	+ 'Here are the details:<br><br>'
	+ 'Name: ' + req.body.name + '<br>'
	+ 'Phone Number: ' + req.body.phone + '<br>'
	+ 'Message: <br><br>' + req.body.message.replace('\n', '<br>');

	var mailOptions = {
		from: '"jakestockwin.co.uk" <noreply@jakestockwin.co.uk>', // sender address
		to: req.body.to, // list of receivers
		subject: 'S4S Website Contact Form', // Subject line
		html: message, // plaintext body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
			res.statusCode = 500;
		} else {
			res.statusCode = 200;
			console.log('Message sent: ' + info.response);
		}
		res.end();

	});

};
