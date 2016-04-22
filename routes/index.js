var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/files', middleware.requireUser, routes.views.files);	
	app.get('/whatwedo', routes.views.whatwedo);
	app.get('/journey', routes.views.journey);
	app.get('/getinvolvedtutors', routes.views.getinvolvedtutors);
	app.get('/getinvolvedschools', routes.views.getinvolvedschools);
	app.get('/contact', routes.views.contact);
};
