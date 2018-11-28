/**
 * Engagement Lab Website
 * 
 * Tamagagement Model
 * @class subdirectory
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

const keystone = global.keystone;
const Types = keystone.Field.Types;

/**
 * @module subdirectory
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var TamaComment = new keystone.List('TamaComment', 
    {
        hidden: true,
        // nocreate: true,
        // nodelete: true
    });

/**
 * Model Fields
 * @main Project
 */
TamaComment.add({
    author: { type: String, hidden: true, default: 50 },
    content: { type: String, hidden: true, default: 100 }
});

/**
 * Model Registration
 * =============
 */
TamaComment.defaultSort = 'sortOrder';
TamaComment.register();

