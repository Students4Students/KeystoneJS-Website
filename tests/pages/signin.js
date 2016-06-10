var keystone = require('keystone');

module.exports = {
	url: 'http://' + keystone.get('host') + ':' + keystone.get('port') + '/keystone/signin',
	elements: {
		emailInput: 'input[name=email]',
		passwordInput: 'input[name=password]',
		submitButton: 'button[type=submit]',
	},
	commands: [{
		assertUI: function () {
			this
				.expect.element('@emailInput').to.be.visible;
			this
				.expect.element('@emailInput').to.be.visible;
			this
				.expect.element('@emailInput').to.be.visible;
			return this;
		},
		waitForPageLoad: function () {
			this.waitForElementVisible('@emailInput');
			return this;
		},
	}],
};
