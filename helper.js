const { writeFile } = require('fs')

async function evaluateSelectors (selectors, page) {
  return await page.evaluate((selectors) => {
    let resultados = {}
    selectors.forEach(([type, selector, start, end]) => {
      console.log({ type })
      resultados = { ...resultados, name: type, [type]: [] }
      const row = [...document.querySelectorAll(selector)].slice(start, end)
      row.forEach((item) => {
        console.log({ resultados })
        resultados[type].push(item.textContent)
      })
    })
    return resultados
  }, selectors)
}

function saveToDb (file, data) {
  writeFile(file, JSON.stringify(data, null, 2), (err) => {
    err
      ? console.log(err)
      : console.log('File written successfully\n')
  })
}

async function loadPageAndWait (browser, url) {
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  return page
}

module.exports = { saveToDb, loadPageAndWait, evaluateSelectors }
