var keystone = require('keystone');

/**
 * FileFolder Model
 * ============
 */

var Folder = new keystone.List('Folder', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Folder.add({
	name: { type: String, required: true }
});

Folder.relationship({ ref: 'File', path: 'Folder' });

Folder.register();
