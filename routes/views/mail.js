var keystone = require('keystone');
var nodemailer = require('nodemailer');

var config = {
	host: 'smtp.zoho.com',
	port: 465,
	secure: true,
	authMethod: 'LOGIN',
	auth: {
		user: 'noreply@jakestockwin.co.uk',
		pass: process.env.ZOHO_PASSWORD,
	},
};

var transporter = nodemailer.createTransport(config);

exports = module.exports = function (req, res) {

	var address = keystone.get('host') + ':' + keystone.get('port');
	console.log(address);
	console.log(req.headers.origin);
	if (req.headers.origin.indexOf(address) === -1) {
		// Don't let other people send emails using this server.
		console.log('Banned');
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
