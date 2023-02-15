const spots = [{
  spot: 'sopela',
  windguru: 'https://www.windguru.cz/48690',
  surfForecast: 'https://es.surf-forecast.com/breaks/Sopelana/forecasts/latest'
},
{
  spot: 'cotillo',
  windguru: 'https://www.windguru.cz/46997',
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
            ['waveHeight', '#tabid_0_0_HTSGW td'],
            ['period', '#tabid_0_0_PERPW td'],
            ['tides', '#tabid_0_0_tides text']]
        },
        surfForecast: {
          url: surfForecast,
          selectors: [
            ['energy', 'tr[data-row-name="energy"] td strong']
          ]
        }
      }
    }
  })
  return res
}

const webPages = setData()

module.exports = { webPages }
