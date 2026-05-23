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
  pgm.createTable('health_monitoring', {
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
    age: {
      type: 'integer',
      notNull: true,
    },
    gender: {
      type: 'integer',
      notNull: true,
    },
    weight: {
      type: 'integer',
      notNull: true,
    },
    height: {
      type: 'integer',
      notNull: true,
    },
    systolic_pressure: {
      type: 'integer',
      notNull: true,
    },
    diastolic_pressure: {
      type: 'integer',
      notNull: true,
    },
    cholesterol_level: {
      type: 'integer',
      notNull: true,
    },
    glucose_level: {
      type: 'integer',
      notNull: true,
    },
    smoking_status: {
      type: 'integer',
      notNull: true,
    },
    alcohol_status: {
      type: 'integer',
      notNull: true,
    },
    activity_status: {
      type: 'integer',
      notNull: true,
    },
    recorded_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('health_monitoring', 'user_id');
  pgm.createIndex('health_monitoring', 'recorded_at');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('health_monitoring');
  pgm.dropType('gender_enum');
};
