const { MONGO_URL } = require('./utils/config')
const express = require('express')
const app = express()
const spotsRouter = require('./controllers/spots')
const forecastRouter = require('./controllers/forecasts')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.json())
app.use('/api/spots', spotsRouter)
app.use('/api/forecast', forecastRouter)

info('connecting to', MONGO_URL)

mongoose
	.connect(MONGO_URL)
	.then(() => {
		info('connected to MongoDB')
	})
	.catch(e => {
		error('error connecting to MongoDB:', e.message)
	})

app.use(express.json())

module.exports = app
