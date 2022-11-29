const ProductsModel = require('../models/products')

const errorMessage = 'there was an error, try again'

async function get(req, res) {
    const { id } = req.params
    
    const product = id ? { _id: id }: null

    const products = await ProductsModel.find(product)

    res.send(products)
}

function post(req, res) {
    const { name, price } = req.body

    if (!name || !price) {
        return res.send({
            message: errorMessage
        })
    }

    const product = new ProductsModel({
        name,
        price,
    })

    product.save()

    res.send({
        message: 'created successfully',
        product,
    })
}

async function put(req, res) {
    const { id } = req.params    
    const { name, price } = req.body

    if (!name || !price) {
        return res.send({
            message: errorMessage,
        })
    }

    const productUpdated = {
        name,
        price,
    }

    const product = await ProductsModel.findOneAndUpdate(
        { _id: id },
        productUpdated,
        { new: true }
    )

    res.send({
        message: 'updated successfully',
        product
    })
}

async function remove(req, res) {
    const { id } = req.params

    const product = await ProductsModel.deleteOne({
        _id: id
    })

    if (product.deletedCount > 0) {
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
    post,
    put,
    remove,
}