module.exports = {
	'before': function (browser) {
		browser.contact = browser.page.contact();
		browser.contact.navigate();
		browser.contact.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.contact.assertUI();
	},
};
