var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SchoolsFAQ Model
 * ================
 */

var SchoolsFAQ = new keystone.List('SchoolsFAQ', {
	map: { name: 'question' },
	autokey: { path: 'slug', from: 'question', unique: true },
	defaultSort: '-displayOrder'
});

SchoolsFAQ.add({
	question: { type: String, required: true },
	answer: { type: Types.Markdown, required: true, initial: true },
	displayOrder: { type: Types.Number, required: true, initial: true, unique: true }
});


SchoolsFAQ.defaultColumns = 'question, order|20%';
SchoolsFAQ.register();
