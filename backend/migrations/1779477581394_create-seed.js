export const shorthands = undefined;

export const up = (pgm) => {
  pgm.sql(`
    TRUNCATE user_roles, role_permissions, permissions, roles CASCADE;

    -- PERMISSIONS
    INSERT INTO permissions (id, name, description, code) VALUES
    -- Screening
    ('p-usr-001', 'Create Screening',       'Mengizinkan input data klinis untuk prediksi AI',         'screening:create'),
    ('p-usr-002', 'View Screening History', 'Mengizinkan melihat daftar riwayat skrining milik sendiri', 'screening:view_history'),
    ('p-usr-003', 'View Screening Detail',  'Mengizinkan melihat detail hasil skrining milik sendiri',  'screening:view_detail'),
    ('p-usr-004', 'Delete Screening',       'Mengizinkan menghapus riwayat skrining milik sendiri',     'screening:delete'),
    ('p-usr-005', 'View Summary',           'Mengizinkan melihat ringkasan statistik kesehatan',        'screening:view_summary'),
    ('p-usr-006', 'View Trend',             'Mengizinkan melihat grafik tren kesehatan',                'screening:view_trend'),

    -- Profile
    ('p-usr-007', 'View Profile',           'Mengizinkan melihat data profil sendiri',                  'profile:view'),
    ('p-usr-008', 'Update Profile',         'Mengizinkan mengubah data profil sendiri',                 'profile:update'),
    ('p-usr-009', 'Update Password',        'Mengizinkan mengganti password akun sendiri',              'profile:update_password'),

    -- Notification
    ('p-usr-010', 'View Notifications',     'Mengizinkan melihat notifikasi milik sendiri',             'notification:view'),
    ('p-usr-011', 'Mark Notification Read', 'Mengizinkan menandai notifikasi sebagai sudah dibaca',     'notification:mark_read'),

    -- Admin
    ('p-adm-001', 'View Admin Dashboard',   'Mengizinkan melihat statistik sistem global',              'admin:view_dashboard'),
    ('p-adm-002', 'Manage Users',           'Mengizinkan mengelola akun pengguna',                      'admin:manage_users'),
    ('p-adm-003', 'Manage Notifications',   'Mengizinkan mengirim notifikasi ke user',                  'admin:manage_notifications');

    -- ROLES
    INSERT INTO roles (id, name, description) VALUES
    ('r-admin-001', 'Admin', 'Pengelola penuh sistem dan manajemen pengguna'),
    ('r-user-002',  'User',  'Pengguna utama yang menggunakan fitur skrining jantung berkala');

    -- ROLE PERMISSIONS
    INSERT INTO role_permissions (role_id, permission_id) VALUES
    -- User
    ('r-user-002', 'p-usr-001'),
    ('r-user-002', 'p-usr-002'),
    ('r-user-002', 'p-usr-003'),
    ('r-user-002', 'p-usr-004'),
    ('r-user-002', 'p-usr-005'),
    ('r-user-002', 'p-usr-006'),
    ('r-user-002', 'p-usr-007'),
    ('r-user-002', 'p-usr-008'),
    ('r-user-002', 'p-usr-009'),
    ('r-user-002', 'p-usr-010'),
    ('r-user-002', 'p-usr-011'),

    -- Admin (semua permission user + admin)
    ('r-admin-001', 'p-usr-001'),
    ('r-admin-001', 'p-usr-002'),
    ('r-admin-001', 'p-usr-003'),
    ('r-admin-001', 'p-usr-004'),
    ('r-admin-001', 'p-usr-005'),
    ('r-admin-001', 'p-usr-006'),
    ('r-admin-001', 'p-usr-007'),
    ('r-admin-001', 'p-usr-008'),
    ('r-admin-001', 'p-usr-009'),
    ('r-admin-001', 'p-usr-010'),
    ('r-admin-001', 'p-usr-011'),
    ('r-admin-001', 'p-adm-001'),
    ('r-admin-001', 'p-adm-002'),
    ('r-admin-001', 'p-adm-003');
  `);
};

export const down = (pgm) => {
  pgm.sql(`
    TRUNCATE user_roles, role_permissions, permissions, roles CASCADE;
  `);
};
