import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addUser({ fullName, userName, email, password }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users (id, "full_name", username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [
        id,
        fullName,
        userName,
        email,
        hashedPassword,
        createdAt,
        updatedAt,
      ],
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
    return id;
  }
  async getMeById(userId) {
    const query = {
      text: 'SELECT id, "full_name" AS "fullName",username, email FROM users WHERE id = $1',
      values: [userId],
    };
    const result = await this.pool.query(query);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  }

  async putUserById(userId, { fullName, email }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE users SET "full_name" = $1, email = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [fullName, email, updatedAt, userId],
    };
    const result = await this.pool.query(query);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0].id;
  }
  async putPasswordById(userId, { oldPassword, newPassword }) {
    const query = {
      text: 'SELECT password FROM users WHERE id = $1',
      values: [userId],
    };
    const result = await this.pool.query(query);
    if (result.rowCount === 0) {
      return null;
    }
    const { password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(oldPassword, hashedPassword);
    if (!match) {
      return false;
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = {
      text: 'UPDATE users SET password = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [newHashedPassword, new Date().toISOString(), userId],
    };
    const updateResult = await this.pool.query(updateQuery);
    if (updateResult.rowCount === 0) {
      return null;
    }
    return updateResult.rows[0].id;
  }
}

export default new UserRepositories();
