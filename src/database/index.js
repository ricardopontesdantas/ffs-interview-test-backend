const mongoose = require('mongoose')

connect().catch(console.error)

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/ffs-teste-backend?readPreference=primary&ssl=false&directConnection=true')
}

module.exports = {
    connect,
}