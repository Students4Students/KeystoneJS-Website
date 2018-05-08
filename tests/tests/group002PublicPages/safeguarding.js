module.exports = {
	'before': function (browser) {
		browser.whatwedo = browser.page.safeguarding();
		browser.safeguarding.navigate();
		browser.safeguarding.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Safeguarding Page UI': function (browser) {
		browser.safeguarding.assertUI();
	},
};
