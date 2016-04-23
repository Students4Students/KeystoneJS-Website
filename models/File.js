var keystone = require('keystone');
var Types = keystone.Field.Types;
var mime = require('mime');

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
	folder: { type: Types.Relationship, ref: 'Folder', many: false },
	mimetype: { type: String, hidden: true }
});

File.schema.pre('save', function(next) {
	console.log(this);
	if(this.file.filetype !== undefined){
		this.mimetype = mime.lookup(this.file.filetype);
	}
	next();
});

File.defaultColumns = 'name, folder, author, lastModifiedDate';
File.register();
