const { chromium } = require('playwright')
const { loadPageAndWait, evaluateSelectors } = require('./helper')
const { getData } = require('./data')
const { default: axios } = require('axios')

async function getDataFrom(browser, webPages) {
	const allData = {}
	for (const web in webPages) {
		const { url, selectors } = webPages[web]
		const page = await loadPageAndWait(browser, url)
		allData[web] = await evaluateSelectors(selectors, page)
		await page.close()
	}
	return allData
}

;(async () => {
	const browser = await chromium.launch()
	const webPages = await getData()
	const forecast = []
	for (const spot in webPages) {
		forecast.push({
			name: spot,
			webpages: await getDataFrom(browser, webPages[spot]),
		})
	}
	axios.post('http://localhost:3001/api/forecast', forecast)
	await browser.close()
})()
