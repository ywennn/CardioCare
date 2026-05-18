import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addUser({ fullName, username, birthDate, email, password, role }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users (id, "full-name", username, "birth-date", email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        id,
        fullName,
        username,
        birthDate,
        email,
        hashedPassword,
        role,
        createdAt,
        updatedAt,
      ],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
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
    if (!user) {
      return false;
    }
    const { id, password: hashedPassword } = user.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return false;
    }
    return id;
  }
}

export default new UserRepositories();
