var keystone = require('keystone');
var Trustee = keystone.list('Trustee');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'about';
	locals.subsection = 'trustees';
	
	locals.trustees = [];
	view.on('init', function(next) {
		Trustee.model.find().exec(function(err, results) {
			locals.trustees = results;
		});		
		next();		
	});
	
	
	// Render the view
	view.render('trustees');
	
};
