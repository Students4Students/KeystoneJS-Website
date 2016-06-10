module.exports = {
	'before': function (browser) {
		browser.committee = browser.page.committee();
		browser.committee.navigate();
		browser.committee.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.committee.assertUI();
	},
};
