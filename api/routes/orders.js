const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const orderController = require('../controllers/orders');

// for fetching all orders
router.get('/', checkAuth, orderController.orders_get_all);

// for creating new orders
router.post('/', checkAuth, orderController.orders_create_order);

// for getting orders details by id
router.get('/:orderId', checkAuth, orderController.orders_get_order);

//for deleting orders by id
router.delete('/:orderId', checkAuth, orderController.orders_delete_order);

module.exports = router;