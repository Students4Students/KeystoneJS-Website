var keystone = require('keystone');

module.exports = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port') + '/support',
	elements: {
		identifier: '#supportIdentifier',
		navbar: '.navbar-default',
		navbarBrand: '.navbar-brand',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@navbar').to.be.visible;
			this.expect.element('@navbarBrand').to.be.visible;
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementPresent('@identifier');
			return this;
		},
	}],
};
