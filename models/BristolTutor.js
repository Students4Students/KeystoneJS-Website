var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Committee Member Model
 * =====================
 */

var BristolTutor = new keystone.List('BristolTutor', {
	defaultSort: 'displayOrder',
});

BristolTutor.add({
	name: { type: Types.Name, required: true, index: true },
	description: { type: Types.Markdown, initial: true, required: true },
	picture: { type: Types.CloudinaryImage },
	displayOrder: { type: Types.Number },

});


/**
 * Registration
 */

BristolTutor.defaultColumns = 'name, displayOrder|20%';
BristolTutor.register();
