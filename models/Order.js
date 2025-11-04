const { getPool, sql } = require('../config/db');

class Order {
  // Lấy tất cả orders
  static async getAll() {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT o.*, c.FirstName, c.LastName, c.Email
      FROM Orders o
      LEFT JOIN Customers c ON o.CustomerId = c.Id
      ORDER BY o.OrderDate DESC
    `);
    return result.recordset;
  }

  // Lấy order theo ID
  static async getById(id) {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT o.*, c.FirstName, c.LastName, c.Email
        FROM Orders o
        LEFT JOIN Customers c ON o.CustomerId = c.Id
        WHERE o.Id = @id
      `);
    return result.recordset[0];
  }

  // Tạo order mới
  static async create(data) {
    const pool = await getPool();
    const result = await pool.request()
      .input('customerId', sql.Int, data.customerId)
      .input('orderDate', sql.DateTime, data.orderDate || new Date())
      .input('totalAmount', sql.Decimal(18, 2), data.totalAmount)
      .input('status', sql.NVarChar, data.status)
      .query(`
        INSERT INTO Orders (CustomerId, OrderDate, TotalAmount, Status)
        OUTPUT INSERTED.Id
        VALUES (@customerId, @orderDate, @totalAmount, @status)
      `);
    return result.recordset[0].Id;
  }

  // Cập nhật order
  static async update(id, data) {
    const pool = await getPool();
    await pool.request()
      .input('id', sql.Int, id)
      .input('customerId', sql.Int, data.customerId)
      .input('orderDate', sql.DateTime, data.orderDate)
      .input('totalAmount', sql.Decimal(18, 2), data.totalAmount)
      .input('status', sql.NVarChar, data.status)
      .query(`
        UPDATE Orders
        SET CustomerId = @customerId, OrderDate = @orderDate, 
            TotalAmount = @totalAmount, Status = @status
        WHERE Id = @id
      `);
    return true;
  }

  // Xóa order
  static async delete(id) {
    const pool = await getPool();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Orders WHERE Id = @id');
    return true;
  }
}

module.exports = Order;

