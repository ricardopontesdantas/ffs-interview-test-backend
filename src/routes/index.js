const router = require('express').Router()

const ProductsController = require('../controllers/products')
const CustomersController = require('../controllers/customers')
const OrdersController = require('../controllers/orders')

router.get('/products/:id?', ProductsController.get)
router.post('/products', ProductsController.post)
router.put('/products/:id', ProductsController.put)
router.delete('/products/:id', ProductsController.remove)

router.get('/customers/:id?', CustomersController.get)
router.post('/customers', CustomersController.post)

router.get('/orders/:id?', OrdersController.get)
router.post('/orders/list', OrdersController.getOrdersByCustomer)
router.post('/orders', OrdersController.post)
router.put('/orders/:id', OrdersController.put)
router.delete('/orders/:id', OrdersController.remove)

module.exports = router