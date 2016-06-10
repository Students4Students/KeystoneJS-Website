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
	'Assert Home Page UI on Small Window': function (browser) {
		browser.resizeWindow(498, 600);
		browser.index.assertUISmall();
	},
};
