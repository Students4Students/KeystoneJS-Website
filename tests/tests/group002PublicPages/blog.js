module.exports = {
	'before': function (browser) {
		browser.blog = browser.page.blog();
		browser.blog.navigate();
		browser.blog.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Blog Page UI': function (browser) {
		browser.blog.assertUI();
	},
};
