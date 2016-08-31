var keystone = require('keystone');
var Application = keystone.list('Application');

exports.create = function (req, res) {

	var item = new Application.model();
	var	data = req.body;
	item.getUpdateHandler(req).process(data, function (err) {

		if (err) return res.apiError('error', err);

		res.apiResponse({
			Application: item,
		});

	});
};
