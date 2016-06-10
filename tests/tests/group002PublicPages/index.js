module.exports = {
	'before': function (browser) {
		browser.index = browser.page.index();
		browser.index.navigate();
		browser.index.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.index.assertUI();
	},
};
