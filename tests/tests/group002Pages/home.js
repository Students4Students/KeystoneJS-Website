module.exports = {
	'before': function (browser) {
		browser.home = browser.page.home();
		browser.home.navigate();
		browser.home.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.home.assertUI();
	},
};
