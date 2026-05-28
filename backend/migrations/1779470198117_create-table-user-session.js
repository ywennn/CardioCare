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
  pgm.createTable('user_sessions', {
    id: {
      type: 'varchar(36)',
      primaryKey: true,
      notNull: true,
    },
    user_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'cascade',
    },
    refresh_token: {
      type: 'varchar(255)',
      notNull: true,
    },
    ip_address: {
      type: 'varchar(50)',
    },
    user_agent: {
      type: 'text',
    },
    device_info: {
      type: 'text',
    },
    platform: {
      type: 'varchar(100)',
    },
    is_revoked: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
    last_used_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('user_sessions', 'user_id');
  pgm.createIndex('user_sessions', 'refresh_token');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('user_sessions');
};
