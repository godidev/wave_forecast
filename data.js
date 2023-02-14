const webPages = {
  windguru: {
    url: 'https://www.windguru.cz/48690',
    selectors: [
      ['waveHeight', '#tabid_0_0_HTSGW td'],
      ['period', '#tabid_0_0_PERPW td'],
      ['tides', '#tabid_0_0_tides text']]
  },
  surfForecast: {
    url: 'https://es.surf-forecast.com/breaks/Sopelana/forecasts/latest',
    selectors: [
      ['energy', 'tr[data-row-name="energy"] td strong']
    ]
  }
}

module.exports = { webPages }
