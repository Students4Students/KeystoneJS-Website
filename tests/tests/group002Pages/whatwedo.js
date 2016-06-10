module.exports = {
	'before': function (browser) {
		browser.whatwedo = browser.page.whatwedo();
		browser.whatwedo.navigate();
		browser.whatwedo.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.whatwedo.assertUI();
	},
};
