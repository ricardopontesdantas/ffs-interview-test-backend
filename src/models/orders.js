const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    customerId: String,
    products: Array,
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Pendente' },
})

const Model = mongoose.model('orders', schema)

module.exports = Model