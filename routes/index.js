var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/files', middleware.requireUser, routes.views.files);
	app.get('/file/:file', middleware.requireUser, routes.views.fileviewer);
	app.get('/whatwedo', routes.views.whatwedo);
	app.get('/journey', routes.views.journey);
	app.get('/getinvolvedtutors', routes.views.getinvolvedtutors);
	app.get('/getinvolvedschools', routes.views.getinvolvedschools);
	app.get('/contact', routes.views.contact);
	app.get('/committee', routes.views.committee);
	app.get('/trustees', routes.views.trustees);
	app.get('/account', middleware.requireUser, routes.views.account);
	app.post('/account', middleware.requireUser, routes.views.account);
	app.post('/mail', routes.views.mail);
	app.all('/api/applications/create', keystone.middleware.api,  routes.api.applications.create);
};
