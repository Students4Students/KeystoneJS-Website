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
	var view = new keystone.View(req, res);
	view.on('post', function (next) {

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
				next(err);
			} else {
				console.log('Message sent: ' + info.response);
				next();
			}

		});

	});

	view.render('contact');

};
