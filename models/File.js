var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Model
 * ==========
 */

var File = new keystone.List('File', {
	autokey: { path: 'slug', from: 'name', unique: true },
	track: true
});

File.add({
	name: { type: String, required: true },
	file: {
		type: Types.LocalFile,
		dest: 'private/uploads',
		prefix: '/files/',
		filename: function(item, file){
			return item.id + '.' + file.extension
		},	
	},
	folder: { type: Types.Relationship, ref: 'Folder', many: false }
});

File.defaultColumns = 'name, folder, author, lastModifiedDate';
File.register();
