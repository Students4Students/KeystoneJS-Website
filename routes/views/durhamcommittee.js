var keystone = require('keystone');
var DurhamCommitteeMember = keystone.list('DurhamCommitteeMember');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'about';
	locals.subsection = 'committee';

	locals.members = [];
	view.on('init', function (next) {
		DurhamCommitteeMember.model.find().sort('displayOrder').exec(function (err, results) {
			locals.members = results;
			next(err);
		});
	});


	// Render the view
	view.render('committee');

};
