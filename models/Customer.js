const { getPool, sql } = require('../config/db');

class Customer {
  // Lấy tất cả customers
  static async getAll() {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Customers ORDER BY CreatedAt DESC');
    return result.recordset;
  }

  // Lấy customer theo ID
  static async getById(id) {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Customers WHERE Id = @id');
    return result.recordset[0];
  }

  // Tạo customer mới
  static async create(data) {
    const pool = await getPool();
    const result = await pool.request()
      .input('firstName', sql.NVarChar, data.firstName)
      .input('lastName', sql.NVarChar, data.lastName)
      .input('email', sql.NVarChar, data.email)
      .input('phone', sql.NVarChar, data.phone)
      .query(`
        INSERT INTO Customers (FirstName, LastName, Email, Phone, CreatedAt)
        OUTPUT INSERTED.Id
        VALUES (@firstName, @lastName, @email, @phone, GETDATE())
      `);
    return result.recordset[0].Id;
  }

  // Cập nhật customer
  static async update(id, data) {
    const pool = await getPool();
    await pool.request()
      .input('id', sql.Int, id)
      .input('firstName', sql.NVarChar, data.firstName)
      .input('lastName', sql.NVarChar, data.lastName)
      .input('email', sql.NVarChar, data.email)
      .input('phone', sql.NVarChar, data.phone)
      .query(`
        UPDATE Customers
        SET FirstName = @firstName, LastName = @lastName, Email = @email, Phone = @phone
        WHERE Id = @id
      `);
    return true;
  }

  // Xóa customer
  static async delete(id) {
    const pool = await getPool();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Customers WHERE Id = @id');
    return true;
  }
}

module.exports = Customer;

