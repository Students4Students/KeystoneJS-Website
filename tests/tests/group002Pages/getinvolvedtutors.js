module.exports = {
	'before': function (browser) {
		browser.getinvolvedtutors = browser.page.getinvolvedtutors();
		browser.getinvolvedtutors.navigate();
		browser.getinvolvedtutors.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Home Page UI': function (browser) {
		browser.getinvolvedtutors.assertUI();
	},
};
