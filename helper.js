const { writeFile } = require('fs')

function trimResults (longStr) {
  return longStr
    .split('\t')
    .slice(0, 5)
}

async function evaluateSelectors (selectors, page) {
  return await page.evaluate((selectors) => {
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

module.exports = { trimResults, saveToDb, loadPageAndWait, evaluateSelectors }
