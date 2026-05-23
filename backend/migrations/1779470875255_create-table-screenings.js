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
  pgm.createTable('screening', {
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
    monitoring_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'health_monitoring(id)',
      onDelete: 'cascade',
    },
    label: {
      type: 'integer',
      notNull: true,
    },
    probability: {
      type: 'decimal(5,4)',
      notNull: true,
    },
    category: {
      type: 'varchar(50)',
      notNull: true,
    },
    recommendation: {
      type: 'text',
      notNull: true,
    },
    threshold_used: {
      type: 'decimal(3,2)',
      notNull: true,
    },

    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('screening', 'user_id');
  pgm.createIndex('screening', 'monitoring_id');
  pgm.createIndex('screening', 'created_at');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('screening');
};
