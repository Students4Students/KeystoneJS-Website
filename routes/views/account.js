var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'tutors';
	locals.formData = req.body || {};
	view.on('post', { action: 'updateDetails' }, function (next) {
		User.model.findOne({ _id: locals.formData.id }).exec(function (err, user) {
			if (user) {
				user._.password.compare(locals.formData.password, function (err, isMatch) {
					if (!err && isMatch) {
						user.name.first = locals.formData.first;
						user.name.last = locals.formData.last;
						user.email = locals.formData.email;
						user.save();
						req.flash('success', { title: 'Update Successful', detail: 'Your details have been successfully updated' });
						res.redirect('back'); // This forces the page to reload so that the changes can be seen immediately.
											// It also stops the brower asking about resending the information on refreshing the page
					} else {
						req.flash('error', { title: 'Update Failed', detail: 'Failed to verify current password. Please try again.' });
						next(err);
					}
				});
			} else {
				req.flash('error', { title: 'Update Failed', detail: 'Failed to find your user id in the database. Please try again, or contact an administrator if the problem persists' });
				next(err);
			}
		});
	});

	view.on('post', { action: 'updatePassword' }, function (next) {
		if (locals.formData.new !== locals.formData.confirm) {
			req.flash('error', { title: 'Update Failed', detail: 'The two passwords do not match. Please try again' });
			next();
		} else {
			User.model.findOne({ _id: locals.formData.id }).exec(function (err, user) {
				if (user) {
					user._.password.compare(locals.formData.current, function (err, isMatch) {
						if (!err && isMatch) {
							user.password = locals.formData.new;
							user.save();
							req.flash('success', { title: 'Update Successful', detail: 'Your password has been successfully updated' });
							res.redirect('/account');
						} else {
							req.flash('error', { title: 'Update Failed', detail: 'Failed to verify current password. Please try again.' });
							next(err);

						}
					});
				} else {
					req.flash('error', { title: 'Update Failed', detail: 'Failed to find your user id in the database. Please try again, or contact an administrator if the problem persists' });
					next(err);
				}
			});
		}

	});

	// Render the view
	view.render('account');

};
