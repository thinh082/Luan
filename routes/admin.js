const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const accountController = require('../controllers/accountController');
const orderController = require('../controllers/orderController');

// Dashboard
router.get('/', (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Customers routes
router.get('/customers', customerController.list);
router.get('/customers/create', customerController.createForm);
router.post('/customers/create', customerController.create);
router.get('/customers/:id/edit', customerController.editForm);
router.post('/customers/:id/edit', customerController.update);
router.post('/customers/:id/delete', customerController.delete);

// Accounts routes
router.get('/accounts', accountController.list);
router.get('/accounts/create', accountController.createForm);
router.post('/accounts/create', accountController.create);
router.get('/accounts/:id/edit', accountController.editForm);
router.post('/accounts/:id/edit', accountController.update);
router.post('/accounts/:id/delete', accountController.delete);

// Orders routes
router.get('/orders', orderController.list);
router.get('/orders/create', orderController.createForm);
router.post('/orders/create', orderController.create);
router.get('/orders/:id/edit', orderController.editForm);
router.post('/orders/:id/edit', orderController.update);
router.post('/orders/:id/delete', orderController.delete);

module.exports = router;

