const mongoose = require('mongoose')

const spotSchema = new mongoose.Schema({
	spot: String,
	windguru: String,
	surfForecast: String,
})

module.exports = mongoose.model('Spot', spotSchema)
