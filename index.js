const { chromium } = require('playwright')
const fs = require('fs')

function trimResults (longStr, file) {
  longStr
    .split('\t')
    .slice(0, 5)
    .map(res => file.push(res))
}

const finalJson = {
  windguru: { waves: [], dates: [] },
  surfForecast: { waves: [], dates: [] }
}

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://www.windguru.cz/48690')

  const wavesHeight = await (await page.innerText('[id = "tabid_0_0_HTSGW"]'))
  const dates = await (await page.innerText('[id = "tabid_0_0_dates"]'))
  trimResults(wavesHeight, finalJson.windguru.waves)
  trimResults(dates, finalJson.windguru.dates)

  fs.writeFile('windguru.json', JSON.stringify(finalJson, null, 2), (err) => {
    err
      ? console.log(err)
      : console.log('File written successfully\n')
  })
  await browser.close()
})()
