const { chromium } = require('playwright')
const { saveToDb, loadPageAndWait, evaluateSelectors } = require('./helper')
const { webPages } = require('./data')

async function getDataFrom (browser, webPages) {
  let allData = {}
  for (const web in webPages) {
    allData = { ...allData, [web]: [] }
    const { url, selectors } = webPages[web]
    const page = await loadPageAndWait(browser, url)

    const results = await evaluateSelectors(selectors, page)
    allData[web].push(results)
    await page.close()
  }

  return allData
}

;(async () => {
  const browser = await chromium.launch()

  const forecast = await getDataFrom(browser, webPages)

  saveToDb('./db/forecast.json', forecast)
  await browser.close()
})()
