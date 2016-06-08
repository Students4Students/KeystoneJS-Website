var keystone = require('keystone');
var TutorFaq = keystone.list('TutorFaq');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'getinvolved';
	locals.section = 'getinvolvedtutors';

	locals.faqs = [];

	view.on('init', function (next) {
		TutorFaq.model.find().sort('displayOrder').exec(function (err, results) {
			locals.faqs = results;
			next(err);
		});
	});


	// Render the view
	view.render('getinvolvedtutors');

};
