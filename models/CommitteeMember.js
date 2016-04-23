var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Committee Member Model
 * =====================
 */

var CommitteeMember = new keystone.List('CommitteeMember', {
	defaultSort: 'displayOrder'
});

CommitteeMember.add({
	name: { type: Types.Name, required: true, index: true },
	position: { type: String, initial: true },
	description: { type: Types.Markdown, initial: true, required: true },
	picture: { type: Types.CloudinaryImage },

});


/**
 * Registration
 */

CommitteeMember.defaultColumns = 'name, position|20%, displayOrder|20%';
CommitteeMember.register();
