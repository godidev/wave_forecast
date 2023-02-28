const spots = require('../db/spots.json')

function getData() {
	let res = {}
	spots.forEach(({ spot, windguru, surfForecast }) => {
		res = {
			...res,
			[spot]: {
				windguru: {
					url: windguru,
					selectors: [
						['waveHeight', '#tabid_0_0_HTSGW td', 0, 6],
						['period', '#tabid_0_0_PERPW td', 0, 6],
						['tides', '#tabid_0_0_tides text', 0, 3],
					],
				},
				surfForecast: {
					url: surfForecast,
					selectors: [
						[
							'energy',
							'tr[data-row-name="energy"] td strong',
							1,
							7,
						],
						['time', 'tr[data-row-name="time"] td', 1, 7],
					],
				},
			},
		}
	})
	return res
}

module.exports = { getData }
