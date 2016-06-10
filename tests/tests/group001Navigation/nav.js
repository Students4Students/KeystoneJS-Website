var keystone = require('keystone');
var baseURL = 'http://' + keystone.get('host') + ':' + keystone.get('port');

module.exports = {
	'before': function (browser) {
		browser.nav = browser.page.navbar();
		browser.nav.navigate();
		browser.nav.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Navbar should initially display correctly': function (browser) {
		browser.nav.assertUI();

	},
	'Dropdowns should display correctly': function (browser) {
		browser.nav.clickLink('about');
		browser.nav.checkDropdown([
			'What We Do',
			'Our Journey',
			'Meet the Committee',
			'Meet the Trustees',
		]);

		browser.nav.clickLink('involved');
		browser.nav.checkDropdown([
			'For Tutors',
			'For Schools',
		]);
	},
	'Links shoud lead to the correct URLs': function (browser) {
		// TODO This needs improving. We shouldn't need to  pause.
		// If each page had an identifying marker, we could call e.g.
		// browser.home.waitForPageLoad() for each page.

		browser.nav.clickLink('home');
		assertURL(browser, '/');
		browser.pause(50);

		browser.nav.clickLink('about');
		browser.nav.clickOpenDropdownLink('first');
		assertURL(browser, '/whatwedo');
		browser.pause(50);
		browser.nav.clickLink('about');
		browser.nav.clickOpenDropdownLink('second');
		assertURL(browser, '/journey');
		browser.pause(50);
		browser.nav.clickLink('about');
		browser.nav.clickOpenDropdownLink('third');
		assertURL(browser, '/committee');
		browser.pause(50);
		browser.nav.clickLink('about');
		browser.nav.clickOpenDropdownLink('fourth');
		assertURL(browser, '/trustees');
		browser.pause(50);

		browser.nav.clickLink('involved');
		browser.nav.clickOpenDropdownLink('first');
		assertURL(browser, '/getinvolvedtutors');
		browser.pause(50);
		browser.nav.clickLink('involved');
		browser.nav.clickOpenDropdownLink('second');
		assertURL(browser, '/getinvolvedschools');
		browser.pause(50);

		browser.nav.clickLink('blog');
		assertURL(browser, '/blog');
		browser.pause(50);

		browser.nav.clickLink('contact');
		assertURL(browser, '/contact');
		browser.pause(50);

		browser.nav.clickLink('signIn');
		assertURL(browser, '/keystone/signin');
		browser.pause(50);
	},
};

function assertURL (browser, url) {
	browser.url(function (result) {
		this.assert.equal(result.value, baseURL + url, 'URL Correct');
	});
	return this;
}
