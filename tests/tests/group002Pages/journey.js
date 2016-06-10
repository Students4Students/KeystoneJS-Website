module.exports = {
	'before': function (browser) {
		browser.journey = browser.page.journey();
		browser.journey.navigate();
		browser.journey.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.journey.assertUI();
	},
};
