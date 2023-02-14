const { chromium } = require('playwright')
const { writeFile } = require('fs')

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

async function getDataFrom (browser, webPages) {
  let allData = {}
  for (const web in webPages) {
    allData = { ...allData, [web]: [] }
    const { url, selectors } = webPages[web]
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForLoadState('networkidle')

    const results = await page.evaluate((selectors) => {
      let resultados = {}
      selectors.forEach(type => {
        resultados = { ...resultados, [type[0]]: [] }
        const row = [...document.querySelectorAll(type[1])].slice(0, 6)
        row.forEach((item) => {
          resultados[type[0]].push(item.textContent)
        })
      })
      return resultados
    }, selectors)
    allData[web].push(results)

    await page.close()
  }

  return allData
}

;(async () => {
  const browser = await chromium.launch()

  const wavesHeight = await getDataFrom(browser, webPages)

  writeFile('windguru.json', JSON.stringify(wavesHeight, null, 2), (err) => {
    err
      ? console.log(err)
      : console.log('File written successfully\n')
  })
  await browser.close()
})()
