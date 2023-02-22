const forecastRouter = require('express').Router()
const Forecast = require('../models/forecast')
const { error } = require('../utils/logger')

forecastRouter.get('/', async (request, response) => {
	const forecast = await Forecast.find({})
	response.json(forecast)
})

forecastRouter.post('/', async (request, response) => {
	const { body } = request

	await Forecast.deleteMany({})
	const fore = new Forecast({ forecast: body })
	fore.save()
		.then(savedForecast => response.json(savedForecast))
		.catch(e => error(e))
})

module.exports = forecastRouter
