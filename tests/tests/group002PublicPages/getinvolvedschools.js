module.exports = {
	'before': function (browser) {
		browser.getinvolvedschools = browser.page.getinvolvedschools();
		browser.getinvolvedschools.navigate();
		browser.getinvolvedschools.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Assert Get Involved - Schools Page UI': function (browser) {
		browser.getinvolvedschools.assertUI();
	},
};
