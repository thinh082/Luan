const Order = require('../models/Order');
const Customer = require('../models/Customer');

exports.list = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.render('admin/orders/list', { orders, title: 'Quản lý Orders' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.createForm = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.render('admin/orders/create', { customers, title: 'Thêm Order' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.create = async (req, res) => {
  try {
    await Order.create(req.body);
    res.redirect('/admin/orders');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.editForm = async (req, res) => {
  try {
    const [order, customers] = await Promise.all([
      Order.getById(req.params.id),
      Customer.getAll()
    ]);
    if (!order) {
      return res.status(404).render('error', { error: 'Order không tồn tại', title: 'Lỗi' });
    }
    res.render('admin/orders/edit', { order, customers, title: 'Sửa Order' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.update = async (req, res) => {
  try {
    await Order.update(req.params.id, req.body);
    res.redirect('/admin/orders');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Order.delete(req.params.id);
    res.redirect('/admin/orders');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

