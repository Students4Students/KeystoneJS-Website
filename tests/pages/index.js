var keystone = require('keystone');

module.exports = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port') + '/',
	elements: {
		identifier: '#indexIdentifier',
		navbar: '.navbar-default',
		navbarBrand: '.navbar-brand',
		hometop: '#hometop',
		titletext: '#titletext',
		shortTitletext: '#titletext-short',

		title1: '.border:nth-of-type(1)',
	},
	commands: [{
		assertUI: function () {
			this.expect.element('@navbar').to.be.visible;
			this.expect.element('@navbarBrand').to.be.visible;
			this.expect.element('@hometop').to.be.visible;
			this.expect.element('@titletext').to.be.visible;
			this.expect.element('@shortTitletext').to.be.present;
			this.expect.element('@shortTitletext').to.be.not.visible;
			return this;
		},
		assertUISmall: function () {
			this.expect.element('@navbar').to.be.visible;
			this.expect.element('@navbarBrand').to.be.visible;
			this.expect.element('@hometop').to.be.visible;
			this.expect.element('@titletext').to.be.present;
			this.expect.element('@titletext').to.be.not.visible;
			this.expect.element('@shortTitletext').to.be.visible;
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementPresent('@identifier');
			return this;
		},
	}],
};
