const { default: axios } = require('axios')
const { info } = require('console')
const { writeFile } = require('fs')

async function evaluateSelectors(selectors, page) {
	try {
		return await page.evaluate(selectors => {
			let resultados = {}
			selectors.forEach(([type, selector, start, end]) => {
				resultados = { ...resultados, [type]: [] }
				const row = [...document.querySelectorAll(selector)].slice(
					start,
					end
				)
				row.forEach(item => {
					resultados[type].push(item.textContent)
				})
			})
			return resultados
		}, selectors)
	} catch (error) {
		console.log('Could not evaluate selectors')
		console.error(error)
		return null
	}
}

function saveToDb(file, data) {
	writeFile(file, JSON.stringify(data, null, 2), err => {
		err ? info(err) : info('File written successfully\n')
	})
}

async function loadPageAndWait(browser, url) {
	try {
		const page = await browser.newPage()
		await page.goto(url)
		await page.waitForLoadState('networkidle')
		return page
	} catch (error) {
		console.log('Could not load page and wait')
		console.error(error)
	}
}

async function getSpots() {
	const { data } = await axios.get('http://localhost:3001/api/spots/')
	return data
}

module.exports = { saveToDb, loadPageAndWait, evaluateSelectors, getSpots }
