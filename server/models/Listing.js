/**
 * Engagement Lab Website
 * 
 * Page category Model
 * @module listing
 * @class listing
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
var Listing = new keystone.List('Listing', {
    hidden: true,
    sortable: true,
    autokey: {
        path: 'key',
        from: 'name',
        unique: true
    }
});

/**
 * Local Methods
 * =============
 */
safeString = function(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(',', '');
};

/**
 * Model Fields
 * @main Listing
 */
Listing.add({
    name: {
        type: String,
        label: 'Name',
        required: true,
        initial: true,
        index: true
    },
    description: {
        type: String,
        label: 'Byline',
        required: true,
        initial: true,
        note: 'This displays under listing\'s image. Do not include \'name\' in this field. <br />Text in the above <i>Name</i> prepends this.'
    },
    image: {
        type: Types.CloudinaryImage,
        label: 'Thumbnail Image',
        folder: 'site/listings',
        autoCleanup: true, 
        note: 'This displays as the grid listing image/thumbnail on its respective page.'
    }
});

/**
 * Methods
 * =============
 */
Listing.schema.methods.safeName = function() {
    return safeString(this.name);
};

/**
 * Hooks
 * =============
 */
Listing.schema.pre('save', function(next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();

    next();

});

Listing.schema.post('save', function(next) {

    // Make a post to slack when this Listing is updated
    // keystone.get('slack').Post(Listing.schema, this, true);

});

/**
 * Model Registration
 */
Listing.defaultSort = 'sortOrder';
Listing.defaultColumns = 'name';
Listing.register();

exports = module.exports = Listing;