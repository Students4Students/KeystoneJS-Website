var keystone = require('keystone');

module.exports = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port'),
	elements: {
		navbar: '.navbar-default',
		headerBrand: '.navbar-brand',
		hometop: '#hometop',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@navbar').to.not.be.visible;
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementVisible('@hometop');
			return this;
		},
	}],
};
