var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TutorsFAQ Model
 * ===============
 */

var TutorFaq = new keystone.List('TutorFaq', {
	map: { name: 'question' },
	autokey: { path: 'slug', from: 'question', unique: true },
	defaultSort: 'displayOrder',
});

TutorFaq.add({
	question: { type: String, required: true },
	answer: { type: Types.Markdown, required: true, initial: true },
	displayOrder: { type: Types.Number, required: true, initial: true, unique: true },
});


TutorFaq.defaultColumns = 'question, displayOrder|20%';
TutorFaq.register();
