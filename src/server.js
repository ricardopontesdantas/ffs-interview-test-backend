const express = require('express')
const cors = require('cors')

const db = require('./database')

const app = express()

db.connect()

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is running on port ${port}`))