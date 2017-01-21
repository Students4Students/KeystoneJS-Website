var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Committee Member Model
 * =====================
 */

var DurhamTutor = new keystone.List('DurhamTutor', {
	defaultSort: 'displayOrder',
});

DurhamTutor.add({
	name: { type: Types.Name, required: true, index: true },
	description: { type: Types.Markdown, initial: true, required: true },
	picture: { type: Types.CloudinaryImage },
	displayOrder: { type: Types.Number },

});


/**
 * Registration
 */

DurhamTutor.defaultColumns = 'name, displayOrder|20%';
DurhamTutor.register();
