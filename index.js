const { chromium } = require('playwright')
const { writeFile } = require('fs')

const webPages = {
  windguru: {
    url: 'https://www.windguru.cz/48690',
    selectors: [
      ['waveHeight', '#tabid_0_0_HTSGW td'],
      ['period', '#tabid_0_0_PERPW td'],
      ['tides', '#tabid_0_0_tides text']]
  }
}

async function getDataFrom (query, browser, { url, selectors }) {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForLoadState('networkidle')

  const allData = { [query]: [] }
  let results = {}
  results = await page.evaluate((selectors) => {
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
  allData[query].push(results)

  await page.close()

  return allData
}

;(async () => {
  const browser = await chromium.launch()

  const wavesHeight = await getDataFrom('windguru', browser, webPages.windguru)

  writeFile('windguru.json', JSON.stringify(wavesHeight, null, 2), (err) => {
    err
      ? console.log(err)
      : console.log('File written successfully\n')
  })
  await browser.close()
})()
