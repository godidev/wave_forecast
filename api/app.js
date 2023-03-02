const express = require('express')
const app = express()
const forecastRouter = require('./controllers/forecasts')
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/forecast', forecastRouter)

app.use(express.json())

module.exports = app
