const { chromium } = require('playwright')
const { saveToDb, loadPageAndWait, evaluateSelectors } = require('./helper')
const { getData } = require('./data')

async function getDataFrom(browser, webPages) {
	const allData = {}
	for (const web in webPages) {
		try {
			const { url, selectors } = webPages[web]
			const page = await loadPageAndWait(browser, url)
			allData[web] = await evaluateSelectors(selectors, page)
			await page.close()
		} catch (error) {
			console.error(error)
		}
	}
	return allData
}

;(async () => {
	const browser = await chromium.launch()
	const webPages = await getData()
	const forecast = { forecast: [] }
	for (const spot in webPages) {
		forecast.forecast.push({
			name: spot,
			webpages: await getDataFrom(browser, webPages[spot]),
		})
	}
	saveToDb('./db/forecast.json', forecast)
	await browser.close()
})()
