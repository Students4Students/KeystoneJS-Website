var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TutorsFAQ Model
 * ===============
 */

var TutorsFAQ = new keystone.List('TutorsFAQ', {
	map: { name: 'question' },
	autokey: { path: 'slug', from: 'question', unique: true },
	defaultSort: '-displayOrder'
});

TutorsFAQ.add({
	question: { type: String, required: true },
	answer: { type: Types.Markdown, required: true, initial: true },
	displayOrder: { type: Types.Number, required: true, initial: true, unique: true }
});


TutorsFAQ.defaultColumns = 'question, order|20%';
TutorsFAQ.register();
