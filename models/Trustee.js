var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Committee Member Model
 * =====================
 */

var Trustee = new keystone.List('Trustee');

Trustee.add({
	name: { type: Types.Name, required: true, index: true },
	position: { type: String, initial: true },
	description: { type: Types.Markdown, initial: true, required: true },
	picture: { type: Types.CloudinaryImage }
});


/**
 * Registration
 */

Trustee.defaultColumns = 'name';
Trustee.register();
