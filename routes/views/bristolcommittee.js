var keystone = require('keystone');
var BristolCommitteeMember = keystone.list('BristolCommitteeMember');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'branches';
	locals.subsection = 'durhambranch';

	locals.members = [];
	view.on('init', function (next) {
		BristolCommitteeMember.model.find().sort('displayOrder').exec(function (err, results) {
			locals.members = results;
			next(err);
		});
	});


	// Render the view
	view.render('committee');

};
