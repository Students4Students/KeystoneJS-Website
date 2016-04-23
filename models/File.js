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
	folder: { type: Types.Relationship, ref: 'Folder', many: false },
	mimetype: { type: String, hidden: true }
});

File.schema.pre('save', function(next) {
	if(this.file.filetype !== undefined){
		console.log(this.file.filetype);
		this.mimetype = convert(this.file.filetype);
		console.log(this.mimetype);
	}
	next();
});

File.defaultColumns = 'name, folder, author, lastModifiedDate';
File.register();

function convert(mimetype) {
	switch (mimetype) {
// Word document types.
    case 'application/msword':
    case 'application/vnd.ms-word.document.macroEnabled.12':
    case 'application/vnd.oasis.opendocument.text':
    case 'application/vnd.oasis.opendocument.text-template':
    case 'application/vnd.oasis.opendocument.text-master':
    case 'application/vnd.oasis.opendocument.text-web':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.stardivision.writer':
    case 'application/vnd.sun.xml.writer':
    case 'application/vnd.sun.xml.writer.template':
    case 'application/vnd.sun.xml.writer.global':
    case 'application/vnd.wordperfect':
    case 'application/x-abiword':
    case 'application/x-applix-word':
    case 'application/x-kword':
    case 'application/x-kword-crypt':
      return 'application/msword';

      // Spreadsheet document types.
    case 'application/vnd.ms-excel':
    case 'application/vnd.ms-excel.sheet.macroEnabled.12':
    case 'application/vnd.oasis.opendocument.spreadsheet':
    case 'application/vnd.oasis.opendocument.spreadsheet-template':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.stardivision.calc':
    case 'application/vnd.sun.xml.calc':
    case 'application/vnd.sun.xml.calc.template':
    case 'application/vnd.lotus-1-2-3':
    case 'application/x-applix-spreadsheet':
    case 'application/x-gnumeric':
    case 'application/x-kspread':
    case 'application/x-kspread-crypt':
      return 'application/vnd.ms-excel';

      // Presentation document types.
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.ms-powerpoint.presentation.macroEnabled.12':
    case 'application/vnd.oasis.opendocument.presentation':
    case 'application/vnd.oasis.opendocument.presentation-template':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.stardivision.impress':
    case 'application/vnd.sun.xml.impress':
    case 'application/vnd.sun.xml.impress.template':
    case 'application/x-kpresenter':
      return 'application/vnd.ms-powerpoint';

      // Compressed archive types.
    case 'application/zip':
    case 'application/x-zip':
    case 'application/stuffit':
    case 'application/x-stuffit':
    case 'application/x-7z-compressed':
    case 'application/x-ace':
    case 'application/x-arj':
    case 'application/x-bzip':
    case 'application/x-bzip-compressed-tar':
    case 'application/x-compress':
    case 'application/x-compressed-tar':
    case 'application/x-cpio-compressed':
    case 'application/x-deb':
    case 'application/x-gzip':
    case 'application/x-java-archive':
    case 'application/x-lha':
    case 'application/x-lhz':
    case 'application/x-lzop':
    case 'application/x-rar':
    case 'application/x-rpm':
    case 'application/x-tzo':
    case 'application/x-tar':
    case 'application/x-tarz':
    case 'application/x-tgz':
      return 'application/zip';

      // Executable types.
    case 'application/x-macbinary':
    case 'application/x-ms-dos-executable':
    case 'application/x-pef-executable':
      return 'text/x-sh';

    default:
      return mimetype;
  }	

}
