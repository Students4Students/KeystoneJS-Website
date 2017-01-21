var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Committee Member Model
 * =====================
 */

var OxfordTutor = new keystone.List('OxfordTutor', {
	defaultSort: 'displayOrder',
});

OxfordTutor.add({
	name: { type: Types.Name, required: true, index: true },
	description: { type: Types.Markdown, initial: true, required: true },
	picture: { type: Types.CloudinaryImage },
	displayOrder: { type: Types.Number },

});


/**
 * Registration
 */

OxfordTutor.defaultColumns = 'name, displayOrder|20%';
OxfordTutor.register();
