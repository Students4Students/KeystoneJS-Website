var keystone = require('keystone');

module.exports = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port'),
	elements: {
		navbar: '.navbar-default',
		navbarBrand: '.navbar-brand',
		navbarRight: '.navbar-right',

		homeLink: '.navbar-right > li:nth-of-type(1) > a',
		aboutLink: '.navbar-right > li:nth-of-type(2) > a',
		branchesLink: '.navbar-right > li:nth-of-type(3) > a',
		involvedLink: '.navbar-right > li:nth-of-type(4) > a',
		blogLink: '.navbar-right > li:nth-of-type(5) > a',
		applyLink: '.navbar-right > li:nth-of-type(6) > a',
		contactLink: '.navbar-right > li:nth-of-type(7) > a',
		supportLink: '.navbar-right > li:nth-of-type(8) > a',
		signInLink: '.navbar-right > li:nth-of-type(9) > a',

		activeLink: '.active:nth-of-type(1) > a',
		activeSubLink: 'active:nth-of-type(2) > a',

		openDropdown: '.open > a',
		firstOpenDropdownItem: '.open > ul > li:nth-of-type(1) a',
		secondOpenDropdownItem: '.open > ul > li:nth-of-type(2) a',
		thirdOpenDropdownItem: '.open > ul > li:nth-of-type(3) a',
		fourthOpenDropdownItem: '.open > ul > li:nth-of-type(4) a',
		fifthOpenDropdownItem: '.open > ul > li:nth-of-type(5) a',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@navbar').to.be.visible;
			this.expect.element('@navbarBrand').to.be.visible;
			this.expect.element('@navbarBrand').text.to.equal('STUDENTS4STUDENTS');

			this.expect.element('@navbarRight').to.be.visible;
			this.expect.element('@homeLink').to.be.visible;
			this.expect.element('@homeLink').text.to.equal('Home');
			this.expect.element('@aboutLink').to.be.visible;
			this.expect.element('@aboutLink').text.to.equal('About Us');
			this.expect.element('@branchesLink').to.be.visible;
			this.expect.element('@branchesLink').text.to.equal('Branches');
			this.expect.element('@involvedLink').to.be.visible;
			this.expect.element('@involvedLink').text.to.equal('Get Involved');
			this.expect.element('@blogLink').to.be.visible;
			this.expect.element('@blogLink').text.to.equal('Blog');
			this.expect.element('@contactLink').to.be.visible;
			this.expect.element('@contactLink').text.to.equal('Contact Us');
			this.expect.element('@applyLink').to.be.visible;
			this.expect.element('@applyLink').text.to.equal('Apply Now');
			this.expect.element('@supportLink').to.be.visible;
			this.expect.element('@supportLink').text.to.equal('Support Us');
			this.expect.element('@signInLink').to.be.visible;
			this.expect.element('@signInLink').text.to.equal('Sign In');
			return this;
		},
		checkDropdown: function (names) {
			if (names.length > 3) {
				this.expect.element('@fourthOpenDropdownItem').to.be.visible;
				this.expect.element('@fourthOpenDropdownItem').text.to.equal(names[3]);
			}
			if (names.length > 2) {
				this.expect.element('@thirdOpenDropdownItem').to.be.visible;
				this.expect.element('@thirdOpenDropdownItem').text.to.equal(names[2]);
			}
			if (names.length > 1) {
				this.expect.element('@secondOpenDropdownItem').to.be.visible;
				this.expect.element('@secondOpenDropdownItem').text.to.equal(names[1]);
			}
			if (names.length > 0) {
				this.expect.element('@firstOpenDropdownItem').to.be.visible;
				this.expect.element('@firstOpenDropdownItem').text.to.equal(names[0]);
			}
			return this;
		},
		clickOpenDropdownLink: function (number) {
			this.click('@' + number + 'OpenDropdownItem');
		},
		clickLink: function (link) {
			this.click('@' + link + 'Link');
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementVisible('@navbar');
			return this;
		},
	}],
};
