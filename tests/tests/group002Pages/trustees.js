module.exports = {
	'before': function (browser) {
		browser.trustees = browser.page.trustees();
		browser.trustees.navigate();
		browser.trustees.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.trustees.assertUI();
	},
};
