module.exports = {
	'before': function (browser) {
		browser.support = browser.page.support();
		browser.support.navigate();
		browser.support.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Support US Page UI': function (browser) {
		browser.support.assertUI();
	},
};
