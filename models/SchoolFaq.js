var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SchoolFaq Model
 * ================
 */

var SchoolFaq = new keystone.List('SchoolFaq', {
	map: { name: 'question' },
	autokey: { path: 'slug', from: 'question', unique: true },
	defaultSort: 'displayOrder',
});

SchoolFaq.add({
	question: { type: String, required: true },
	answer: { type: Types.Markdown, required: true, initial: true },
	displayOrder: { type: Types.Number, required: true, initial: true, unique: true },
});


SchoolFaq.defaultColumns = 'question, displayOrder|20%';
SchoolFaq.register();
