module.exports = {
	'before': function (browser) {
		browser.app = browser.page.app();
		browser.app.navigate();
		browser.app.waitForPageLoad();
	},
	'after': function (browser) {
		browser.end();
	},
	'Navbar should initially display correctly': function (browser) {
		browser.app.assertUI();

	},
	'Dropdowns should display correctly': function (browser) {
		browser.app.clickLink('about');
		browser.app.checkDropdown([
			'What We Do',
			'Our Journey',
			'Meet the Trustees',
		]);

		browser.app.clickLink('branches');
		browser.app.checkDropdown([
			'Oxford',
			'Durham',
			'Bristol',
		]);

		browser.app.clickLink('involved');
		browser.app.checkDropdown([
			'For Tutors',
			'For Schools',
		]);
	},
	'Links shoud lead to the correct URLs': function (browser) {
		browser.app.clickLink('home');
		browser.page.index().waitForPageLoad();

		browser.app.clickLink('about');
		browser.app.clickOpenDropdownLink('first');
		browser.page.whatwedo().waitForPageLoad();
		browser.app.clickLink('about');
		browser.app.clickOpenDropdownLink('second');
		browser.page.journey().waitForPageLoad();
		browser.app.clickLink('about');
		browser.app.clickOpenDropdownLink('third');
		browser.page.trustees().waitForPageLoad();

		browser.app.clickLink('branches');
		browser.app.clickOpenDropdownLink('first');
		browser.page.committee().waitForPageLoad();
		browser.app.clickLink('branches');
		browser.app.clickOpenDropdownLink('second');
		browser.page.committee().waitForPageLoad();
		browser.app.clickLink('branches');
		browser.app.clickOpenDropdownLink('third');
		browser.page.committee().waitForPageLoad();

		browser.app.clickLink('involved');
		browser.app.clickOpenDropdownLink('first');
		browser.page.getinvolvedtutors().waitForPageLoad();
		browser.app.clickLink('involved');
		browser.app.clickOpenDropdownLink('second');
		browser.page.getinvolvedschools().waitForPageLoad();

		browser.app.clickLink('blog');
		browser.page.blog().waitForPageLoad();

		browser.app.clickLink('contact');
		browser.page.contact().waitForPageLoad();

		browser.app.clickLink('support');
		browser.page.support().waitForPageLoad();

		browser.app.clickLink('signIn');
		browser.page.signin().waitForPageLoad();
	},
};
