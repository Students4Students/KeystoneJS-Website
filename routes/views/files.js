var keystone = require('keystone');
var File = keystone.list('File');
var Folder = keystone.list('Folder');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.folders = [];
	locals.files = [];

	view.on('init', function(next) {
		Folder.model.find().exec().then(function(folders) {
			folders.forEach(function(folder) {
				File.model.find().populate('folder createdBy updatedBy').where('folder', folder).exec().then(function(files){
					item = { "folder": folder, "files": files };	
					locals.folders.push(item);
				}, function(err) {
					next(err);
				})
			});
			
			File.model.find().populate('folder createdBy updatedBy').where('folder', null).exec().then(function(files) {
				locals.files = files;
				next();
			}, function(err) {
				next(err);
			});
		}, function(err) {
			next(err);
		});

	});
	view.render('files');
}
