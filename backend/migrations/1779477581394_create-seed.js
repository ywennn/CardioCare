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
  pgm.sql(`
    -- 1. Bersihkan sisa data lama untuk menghindari bentrokan saat testing
    TRUNCATE user_roles, role_permissions, permissions, roles CASCADE;

    -- 2. Suntik Data Master: PERMISSIONS
    INSERT INTO permissions (id, name, description, code) VALUES
    ('p-usr-001', 'Create Screening', 'Mengizinkan input data klinis untuk prediksi AI v7', 'patient:create_screening'),
    ('p-usr-002', 'View Own History', 'Mengizinkan melihat riwayat dan grafik kesehatan milik sendiri', 'patient:view_own_history'),
    ('p-adm-003', 'View Admin Dashboard', 'Mengizinkan melihat statistik sistem global', 'admin:view_dashboard'),
    ('p-adm-004', 'Manage Users', 'Mengizinkan menghapus atau memblokir akun pengguna', 'admin:manage_users');

    -- 3. Suntik Data Master: ROLES
    INSERT INTO roles (id, name, description) VALUES
    ('r-admin-001', 'Admin', 'Pengelola penuh sistem dan manajemen pengguna'),
    ('r-user-002', 'User', 'Pengguna utama yang menggunakan fitur skrining jantung berkala');

    -- 4. Hubungkan ROLES dengan PERMISSIONS (Tabel Jembatan Many-to-Many)
    INSERT INTO role_permissions (role_id, permission_id) VALUES
    -- Hak Akses untuk Role Admin
    ('r-admin-001', 'p-adm-003'),
    ('r-admin-001', 'p-adm-004'),

    -- Hak Akses untuk Role User
    ('r-user-002', 'p-usr-001'),
    ('r-user-002', 'p-usr-002');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  // Ketika migrasi di-rollback (down), bersihkan seluruh data seed di atas
  pgm.sql(`
    TRUNCATE user_roles, role_permissions, permissions, roles CASCADE;
  `);
};
