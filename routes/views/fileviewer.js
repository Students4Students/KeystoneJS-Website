var keystone = require('keystone');
var File = keystone.list('File');
var fs = require('fs');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.filters = {
		id: req.params.file
	};
	view.on('init', function(next) {
		File.model.findOne({ "_id": locals.filters.id }).exec(function(err, result) {
			if(err){
				req.flash('error', { title: "File not found", detail: "Could not find a file with id "+locals.filters.id+" on the server. Please try again, or contact an administrator if the problem persists" });
				res.redirect('/files');
			}else{
				var file = __dirname + "/../../" + result.file.path + "/" + result.file.filename;
				fs.readFile(file, function(err, data) {
					if(err){
						req.flash('error', { title: "File not found", detail: "Could not find "+result.name+" on the server. Please try again, or contact an administrator if the problem persists" });
						res.redirect('/files');
					}else{
						res.contentType(result.file.filetype);
						res.send(data);
					}
				});				
			}
		});
	});
	
	view.render('files');

};
