var keystone = require('keystone');
var CommitteeMember = keystone.list('CommitteeMember');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'about';
	locals.subsection = 'committee';
	
	locals.members = [];
	view.on('init', function(next) {
		CommitteeMember.model.find().sort('displayOrder').exec(function(err, results) {
			locals.members = results;
		});		
		next();		
	});
	
	
	// Render the view
	view.render('committee');
	
};
