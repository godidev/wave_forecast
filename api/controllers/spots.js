const spotsRouter = require('express').Router()
const Spot = require('../models/spot')

spotsRouter.get('/', async (request, response) => {
	const spots = await Spot.find({})
	response.json(spots)
})

module.exports = spotsRouter
