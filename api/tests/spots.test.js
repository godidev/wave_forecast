const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Spot = require('../models/spot')
const api = supertest(app)

const initialSpots = [
	{
		spot: 'xxxxx',
		windguru: 'www.asdf.es',
		surfForecast: 'www.qwerty.es',
	},
	{
		spot: 'aaaa',
		windguru: 'www.ghjk.es',
		surfForecast: 'www.zxcvv.es',
	},
]

beforeAll(async () => {
	await Spot.deleteMany({})
	initialSpots.forEach(async spot => {
		const spotObject = new Spot(spot)
		await spotObject.save()
	})
})

describe('getting spots from server', () => {
	test('spots are returned as json', async () => {
		await api
			.get('/api/spots')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('returns all spots', async () => {
		const { body } = await api.get('/api/spots')
		expect(body).toHaveLength(initialSpots.length)
	})

	test('response containes correct data', async () => {
		const { body } = await api.get('/api/spots')
		const spot = body.map(res => res.spot)
		expect(spot).toContain(['aaaa'])
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
