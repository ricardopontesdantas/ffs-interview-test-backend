const CustomersModel = require('../models/customers')

const errorMessage = 'there was an error, try again'
const existsCustomerMessage = 'please try another email or phone'

async function get(req, res) {
    const { id } = req.params

    const customer = id ? { _id: id } : null

    const customers = await CustomersModel.find(customer)

    res.send(customers)
}

async function post(req, res) {
    const { name, email, phone, address } = req.body

    if (!name || !email || !phone || !address) {
        return res.send({
            message: errorMessage
        })
    }

    const existsCustomer = await CustomersModel.find({ $or: [
        { email },
        { phone },
    ] })

    if (existsCustomer.length > 0) {
        return res.send({
            message: existsCustomerMessage
        })
    }

    const customer = new CustomersModel({
        name,
        email,
        phone,
        address,
    })

    customer.save()

    res.send({
        message: 'created successfully',
        customer,
    })
}

module.exports = {
    get,
    post,
}