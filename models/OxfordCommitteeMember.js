var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Committee Member Model
 * =====================
 */

var OxfordCommitteeMember = new keystone.List('OxfordCommitteeMember', {
	defaultSort: 'displayOrder',
});

OxfordCommitteeMember.add({
	name: { type: Types.Name, required: true, index: true },
	position: { type: String, initial: true },
	description: { type: Types.Markdown, initial: true, required: true },
	picture: { type: Types.CloudinaryImage },
	displayOrder: { type: Types.Number },

});


/**
 * Registration
 */

OxfordCommitteeMember.defaultColumns = 'name, position|20%, displayOrder|20%';
OxfordCommitteeMember.register();
