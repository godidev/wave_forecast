const express = require('express')
const app = express()
const forecastRouter = require('./controllers/forecasts')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/forecast', forecastRouter)

app.use(express.json())

module.exports = app
