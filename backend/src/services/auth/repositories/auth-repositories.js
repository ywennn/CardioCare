import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
class AuthRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addRefreshToken(token, userId, reqInfo = {}) {
    const id = `sess-${nanoid(16)}`;
    const query = {
      text: `INSERT INTO user_sessions (id, user_id, refresh_token, ip_address, user_agent, device_info, platform)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values: [
        id,
        userId,
        token,
        reqInfo.ipAddress,
        reqInfo.userAgent,
        reqInfo.deviceInfo,
        reqInfo.platform,
      ],
    };

    return await this.pool.query(query);
  }
  async putRefreshToken(token) {
    const query = {
      text: `UPDATE user_sessions 
         SET last_used_at = current_timestamp 
         WHERE refresh_token = $1`,
      values: [token],
    };
    await this.pool.query(query);
  }
  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT refresh_token FROM user_sessions WHERE refresh_token = $1',
      values: [token],
    };
    const result = await this.pool.query(query);

    if (!result.rows.length) {
      return false;
    }
    return result.rows[0];
  }
  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM user_sessions WHERE refresh_token = $1',
      values: [token],
    };
    await this.pool.query(query);
  }
}

export default new AuthRepositories();
