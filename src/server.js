const express = require('express')
const cors = require('cors')

const db = require('./database')
const routes = require('./routes')

const app = express()

db.connect()

app.use(express.json())
app.use('/api', routes)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is running on port ${port}`))