const Customer = require('../models/Customer');

exports.list = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.render('admin/customers/list', { customers, title: 'Quản lý Customers' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.createForm = (req, res) => {
  res.render('admin/customers/create', { title: 'Thêm Customer' });
};

exports.create = async (req, res) => {
  try {
    await Customer.create(req.body);
    res.redirect('/admin/customers');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.editForm = async (req, res) => {
  try {
    const customer = await Customer.getById(req.params.id);
    if (!customer) {
      return res.status(404).render('error', { error: 'Customer không tồn tại', title: 'Lỗi' });
    }
    res.render('admin/customers/edit', { customer, title: 'Sửa Customer' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.update = async (req, res) => {
  try {
    await Customer.update(req.params.id, req.body);
    res.redirect('/admin/customers');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Customer.delete(req.params.id);
    res.redirect('/admin/customers');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

