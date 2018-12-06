'use strict';
/**
 * Engagement Lab Website v2.x
 * 
 * Resource page Model
 * @module resource
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;

/**
 * @module resource
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Resource = new keystone.List('Resource', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	}
});

// Storage adapter for Azure
var azureFile = new keystone.Storage({
	adapter: require('keystone-storage-adapter-azure'),
	azure: {
		container: 'resources',
		generateFilename: function (file) {
			// Cleanup filename
			return file.originalname.replace(/[\\'\-\[\]\/\{\}\(\)\*\+\?\\\^\$\|]/g, "").replace(/ /g, '_').toLowerCase();
		}
	},
	schema: {
		path: true,
		originalname: true,
		url: true
	}
});

/**
 * Model Fields
 * @main Resource
 */
Resource.add({
	name: {
		type: String,
		label: 'Resource Name',
		required: true,
		initial: true,
		index: true
	},
	type: {
		type: Types.Select,
		label: 'Type',
		options: 'video, article, blog post, file',
		default: 'video',
		required: true,
		initial: true
	},

	url: {
		type: String,
		label: 'URL',
		dependsOn: {
			type: ['video', 'article', 'blog post']
		},
		initial: true
	},

	summary: {
		type: String,
		label: 'Summary',
		dependsOn: {
			type: ['article', 'blog post']
		}
	},
	date: {
		type: Date,
		label: "Date Published",
		dependsOn: {
			type: ['article', 'blog post']
		}
	},
	author: {
		type: String,
		label: 'Author',
		dependsOn: {
			type: ['article', 'blog post']
		}
	},

	file: {
		type: Types.File,
		dependsOn: {
			type: 'file'
		},
		label: 'File',
		storage: azureFile
	},
	fileSummary: {
		type: Types.Markdown,
		label: 'File Summary',
		dependsOn: {
			type: ['file']
		}
	},

	imageOverride: {
		type: Types.CloudinaryImage,
		dependsOn: {
			type: 'article'
		},
		label: 'Image Override (350 x 233)',
		folder: 'homepage-2.0/research',
		note: 'This should be used if the image provided automatically is not acceptable.',
		autoCleanup: true
	}
});

/**
 * Hooks
 * =============
 */
Resource.schema.pre('save', function (next) {

	var err;

	// Save state for post hook
	this.wasNew = this.isNew;
	this.wasModified = this.isModified();

	/*
		If Azure file upload succeeded but returned no filename, we have to generate manually and save it since
		keystone's createBlockBlobFromLocalFile implementation does not account for Azure returning 
		only "commmittedBlocks" arrays for huge files, and not file metadata.
		I considered submitting a fix PR for azurefile.prototype.uploadFile but I will wait for keystone release ~0.0.4.

		Using filetype as the string to obtain the file extension is not 100% foolproof as it's a MIME type,
		but it works for most common file formats. 
  */
	if (this.type === 'article') {

		if (this.date !== undefined && this.date.length === 0)
			err = 'You must provide the date that the article was published. Sorry bub.';

		//  if (this.summary !== undefined && this.summary.length === 0)
		// err = ('You must define a summary for articles.');

		// else if (this.author !== undefined && this.author.length === 0) 
		// 	err = 'You must provide the name of the author who published the article.';
	}

	if (err !== undefined && err.length > 0)
		next(new Error(err));

	next();

});

Resource.schema.post('save', function (next) {

	// Make a post to slack when this Resource is updated
	// keystone.get('slack').Post(Resource.model, this, true);

});

Resource.schema.pre('remove', function (next) {

	// Remove resource from all that referenced it 
	keystone.list('Project').model.removeResourceRef(this._id, function (err, removedCount) {

		if (err)
			console.error(err);

		if (removedCount > 0)
			console.log("Removed " + removedCount + " references to '" + this._id + "'");

		next();

	});

});


/**
 * Relationships
 * =============
 */
Resource.relationship({
	ref: 'Project',
	refPath: 'files',
	path: 'resources'
});

/**
 * Model Registration
 */
Resource.defaultSort = '-createdAt';
Resource.defaultColumns = 'name, type, createdAt';
Resource.register();