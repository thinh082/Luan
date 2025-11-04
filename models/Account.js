const { getPool, sql } = require('../config/db');

class Account {
  // Lấy tất cả accounts
  static async getAll() {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT a.*, c.FirstName, c.LastName, c.Email
      FROM Accounts a
      LEFT JOIN Customers c ON a.CustomerId = c.Id
      ORDER BY a.CreatedAt DESC
    `);
    return result.recordset;
  }

  // Lấy account theo ID
  static async getById(id) {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT a.*, c.FirstName, c.LastName, c.Email
        FROM Accounts a
        LEFT JOIN Customers c ON a.CustomerId = c.Id
        WHERE a.Id = @id
      `);
    return result.recordset[0];
  }

  // Tạo account mới
  static async create(data) {
    const pool = await getPool();
    const result = await pool.request()
      .input('customerId', sql.Int, data.customerId)
      .input('username', sql.NVarChar, data.username)
      .input('passwordHash', sql.NVarChar, data.passwordHash)
      .input('isActive', sql.Bit, data.isActive !== undefined ? data.isActive : true)
      .query(`
        INSERT INTO Accounts (CustomerId, Username, PasswordHash, IsActive, CreatedAt)
        OUTPUT INSERTED.Id
        VALUES (@customerId, @username, @passwordHash, @isActive, GETDATE())
      `);
    return result.recordset[0].Id;
  }

  // Cập nhật account
  static async update(id, data) {
    const pool = await getPool();
    await pool.request()
      .input('id', sql.Int, id)
      .input('customerId', sql.Int, data.customerId)
      .input('username', sql.NVarChar, data.username)
      .input('passwordHash', sql.NVarChar, data.passwordHash)
      .input('isActive', sql.Bit, data.isActive !== undefined ? data.isActive : true)
      .query(`
        UPDATE Accounts
        SET CustomerId = @customerId, Username = @username, 
            PasswordHash = @passwordHash, IsActive = @isActive
        WHERE Id = @id
      `);
    return true;
  }

  // Xóa account
  static async delete(id) {
    const pool = await getPool();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Accounts WHERE Id = @id');
    return true;
  }
}

module.exports = Account;

