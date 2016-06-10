var keystone = require('keystone');

module.exports = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port') + '/',
	elements: {
		identifier: '#indexIdentifier',
		navbar: '.navbar-default',
		navbarBrand: '.navbar-brand',
		hometop: '#hometop',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@navbar').to.be.visible;
			this.expect.element('@navbarBrand').to.be.visible;
			this.expect.element('@hometop').to.be.visible;
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementPresent('@identifier');
			return this;
		},
	}],
};
