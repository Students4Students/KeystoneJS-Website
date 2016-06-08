var keystone = require('keystone');
var File = keystone.list('File');
var AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: process.env.S3_KEY,
	secretAccessKey: process.env.S3_SECRET,
});

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.filters = {
		file: req.params.file,
	};
	view.on('init', function (next) {
		File.model.findOne({ _id: locals.filters.file }).exec(function (err, result) {
			console.log(result);
			if (err) {
				console.log(err);
				req.flash('error', { title: 'File not found', detail: 'Could not find a file with id ' + locals.filters.file + ' on the server. Please try again, or contact an administrator if the problem persists' });
				res.redirect('/files');
			} else {
				var s3 = new AWS.S3();
				s3.getObject({
					Bucket: process.env.S3_BUCKET, Key: result.file.filename,
				}, function (err, data) {
					if (err != null) {
						console.log(err);
						req.flash('error', { title: 'File not found', detail: 'Could not find ' + result.file.filename + ' on the amazon s3 server. Please try again, or contact an administrator if the problem persists' });
						res.redirect('/files');
					} else {
						res.contentType(result.file.filetype);
						res.setHeader('Content-disposition', 'attachment; filename=' + result.file.originalname);
						res.send(data.body);
					}
				});
			}
		});
	});

	view.render('files');

};
