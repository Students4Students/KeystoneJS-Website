var keystone = require('keystone');
var SchoolFaq = keystone.list('SchoolFaq');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'getinvolved';
	locals.section = 'getinvolvedschools';
	
	locals.faqs = [];

	view.on('init', function(next){
		SchoolFaq.model.find().sort('displayOrder').exec(function (err, results) {
			locals.faqs = results;
			next(err);
		});
	});


	// Render the view
	view.render('getinvolvedschools');
	
};
