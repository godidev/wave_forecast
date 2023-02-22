const { Schema, model } = require('mongoose')

const forecastSchema = new Schema({
	forecast: Object,
})

module.exports = model('Forecast', forecastSchema)
