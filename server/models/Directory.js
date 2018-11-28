/**
 * Engagement Lab Website
 * 
 * Research category Model
 * @module research_category
 * @class research_category
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;

/**
 * @module listing
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Directory = new keystone.List('Directory', 
	{	
		hidden: false,
		autokey: { path: 'key', from: 'name', unique: true },
		nocreate: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Listing
 */
Directory.add({
	name: { type: String, label: 'Directory Name', required: true, initial: true, index: true, note: 'This is the name or title of the directory'},
	lead: { type: String, label: 'Description', required: false, initial: true, note: 'This displays below the name/title' }
});

/**
 * Model Registration
 * =============
 */
Directory.register();
