const { keystone } = global;
const { Types } = keystone.Field;

/**
 * User Model
 * ==========
 */

const User = new keystone.List('User');

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true,
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    index: true,
  },
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Is an admin',
    index: true,
    default: true,
  },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(() => this.isAdmin);

/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
