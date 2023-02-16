const spots = [{
  spot: 'sopela',
  windguru: 'https://www.windguru.cz/48690',
  surfForecast: 'https://es.surf-forecast.com/breaks/Sopelana/forecasts/latest'
},
{
  spot: 'cotillo',
  windguru: 'https://www.windguru.cz/49334',
  surfForecast: 'https://es.surf-forecast.com/breaks/Cotillo/forecasts/latest'
}]

function setData () {
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
            ['tides', '#tabid_0_0_tides text', 0, 3]
          ]
        },
        surfForecast: {
          url: surfForecast,
          selectors: [
            ['energy', 'tr[data-row-name="energy"] td strong', 1, 7],
            ['time', 'tr[data-row-name="time"] td', 1, 7]
          ]
        }
      }
    }
  })
  return res
}

const webPages = setData()

module.exports = { webPages }
