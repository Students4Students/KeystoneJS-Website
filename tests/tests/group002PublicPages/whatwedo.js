module.exports = {
	'before': function (browser) {
		browser.whatwedo = browser.page.whatwedo();
		browser.whatwedo.navigate();
		browser.whatwedo.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert What We Do Page UI': function (browser) {
		browser.whatwedo.assertUI();
	},
};
