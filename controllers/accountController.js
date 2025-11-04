const Account = require('../models/Account');
const Customer = require('../models/Customer');

exports.list = async (req, res) => {
  try {
    const accounts = await Account.getAll();
    res.render('admin/accounts/list', { accounts, title: 'Quản lý Accounts' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.createForm = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.render('admin/accounts/create', { customers, title: 'Thêm Account' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = {
      ...req.body,
      isActive: req.body.isActive === 'true' || req.body.isActive === true
    };
    await Account.create(data);
    res.redirect('/admin/accounts');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.editForm = async (req, res) => {
  try {
    const [account, customers] = await Promise.all([
      Account.getById(req.params.id),
      Customer.getAll()
    ]);
    if (!account) {
      return res.status(404).render('error', { error: 'Account không tồn tại', title: 'Lỗi' });
    }
    res.render('admin/accounts/edit', { account, customers, title: 'Sửa Account' });
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.update = async (req, res) => {
  try {
    const data = {
      ...req.body,
      isActive: req.body.isActive === 'true' || req.body.isActive === true
    };
    await Account.update(req.params.id, data);
    res.redirect('/admin/accounts');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

exports.delete = async (req, res) => {
  try {
    await Account.delete(req.params.id);
    res.redirect('/admin/accounts');
  } catch (error) {
    res.status(500).render('error', { error: error.message, title: 'Lỗi' });
  }
};

