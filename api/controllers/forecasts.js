const forecastRouter = require('express').Router()
const forecast = require('../db/forecast.json')

forecastRouter.get('/', (request, response) => {
	response.json(forecast)
})

module.exports = forecastRouter
