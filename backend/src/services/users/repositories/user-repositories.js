import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addUser({ fullName, username, birthDate, email, password }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users (id, "full_name", email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, fullName, email, hashedPassword, createdAt, updatedAt],
    };
    const result = (await this.pool.query(query)).rows[0].id;
    const roleId = 'r-user-002'; // role default untuk user biasa
    await this.pool.query({
      text: 'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
      values: [result, roleId],
    });
    return result;
  }
  async getPermissionsByUserId(userId) {
    const query = {
      text: `
      SELECT DISTINCT p.code 
      FROM user_roles ur
      JOIN role_permissions rp ON ur.role_id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE ur.user_id = $1
    `,
      values: [userId],
    };
    const result = await this.pool.query(query);
    return result.rows.map((row) => row.code);
  }
  async verifyAvailableEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };
    const result = await this.pool.query(query);
    return result.rows.length === 0;
  }
  async verifyCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE email = $1',
      values: [email],
    };
    const user = await this.pool.query(query);
    if (user.rowCount === 0) {
      return false;
    }
    const { id, password: hashedPassword } = user.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return false;
    }
    console.log('User ID yang ditemukan:', id);
    return id;
  }
}

export default new UserRepositories();
