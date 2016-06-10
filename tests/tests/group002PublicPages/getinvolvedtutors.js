module.exports = {
	'before': function (browser) {
		browser.getinvolvedtutors = browser.page.getinvolvedtutors();
		browser.getinvolvedtutors.navigate();
		browser.getinvolvedtutors.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Get Involved - Tutors Page UI': function (browser) {
		browser.getinvolvedtutors.assertUI();
	},
};
