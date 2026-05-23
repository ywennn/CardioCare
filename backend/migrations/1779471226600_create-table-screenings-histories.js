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
  pgm.createTable('screenings_histories', {
    id: {
      type: 'varchar(36)',
      primaryKey: true,
      notNull: true,
    },
    screening_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'screening(id)',
      onDelete: 'cascade',
    },
    activity: {
      type: 'text',
      notNull: true,
      default: 'Inference Execution',
    },
    metadata: {
      type: 'jsonb',
      notNull: true,
      default: '{}',
    },
  });
  pgm.createIndex('screenings_histories', 'screening_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('screenings_histories');
};
