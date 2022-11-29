const OrdersModel = require('../models/orders')
const ProductsModel = require('../models/products')

const errorMessage = 'there was an error, try again'

async function get(req, res) {
    const { id } = req.params

    const order = id ? { _id: id } : null

    const orders = await OrdersModel.find(order)

    res.send(orders)
}

async function getOrdersByCustomer(req, res) {
    const { customerId } = req.body

    if (!customerId) {
        res.send({
            message: errorMessage
        })
    }

    const orders = await OrdersModel.find({ customerId })

    res.send(orders)
}

async function post(req, res) {
    const { customerId, products } = req.body

    if (!customerId || products.length < 1) {
        res.send({
            message: errorMessage
        })
    }

    const productsList = await ProductsModel.find({ _id: { $in: products} })
    
    if (productsList.length < 1) {
        res.send({
            message: errorMessage
        })
    }

    const order = new OrdersModel({
        customerId,
        products: productsList,
    })

    order.save()

    res.send({
        message: 'created successfully',
        order,
    })
}

async function put(req, res) {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
        return res.send({
            message: errorMessage
        })
    }

    const orderUpdated = { status }

    const order = await OrdersModel.findOneAndUpdate(
        { _id: id },
        orderUpdated,
        { new: true }
    )

    res.send({
        message: 'updated successfully',
        order,
    })
}

async function remove(req, res) {
    const { customerId } = req.body
    const { id } = req.params

    const order = await OrdersModel.deleteOne({ customerId, _id: id })

    if (order.deletedCount > 0) {
        return res.send({
            message: 'deleted successfully'
        })
    }

    res.send({
        message: errorMessage
    })
}

module.exports = {
    get,
    getOrdersByCustomer,
    post,
    put,
    remove,
}