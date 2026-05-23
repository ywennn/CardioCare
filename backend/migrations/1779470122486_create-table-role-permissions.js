/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('role_permissions', {
    role_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'roles(id)',
      onDelete: 'cascade',
    },
    permission_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'permissions(id)',
      onDelete: 'cascade',
    },
  });
  pgm.addConstraint('role_permissions', 'pk_role_permissions', {
    primaryKey: ['role_id', 'permission_id'],
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('role_permissions');
};
