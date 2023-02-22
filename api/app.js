const { MONGO_URL } = require('./utils/config')
const express = require('express')
const app = express()
const spotsRouter = require('./controllers/spots')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

app.use(express.json())
app.use('/api/spots', spotsRouter)

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
