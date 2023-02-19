import { useState, useEffect } from 'react'
import axios from 'axios'
import Row from './components/Row'

function getNumbers(times) {
	const res = times.map(time => {
		let sum = 0
		if (time !== '12\u2009PM') {
			sum = time.includes('PM') ? 12 : 0
		}
		const finalTime = Number(time.slice(0, -3)) + sum
		return finalTime === 24 ? 0 : finalTime
	})
	return res
}

function App() {
	const [forecast, setForecast] = useState([])
	useEffect(() => {
		axios
			.get('http://localhost:3000/forecast')
			.then(({ data }) => setForecast(data))
	}, [])

	return (
		<div className='App'>
			{forecast.map(({ name, webpages }, index) => {
				const { windguru, surfForecast } = webpages

				const horas = getNumbers(surfForecast.time)

				let temp = []
				const dias = []
				horas.forEach((hora, index) => {
					temp.push(hora)
					if (hora >= 21 || index === horas.length - 1) {
						dias.push(temp)
						temp = []
					}
				})

				const fecha = new Date()
				const diaSemana = fecha.toLocaleString('es-sp', {
					weekday: 'long',
				})
				const diaMes = fecha.getDate()

				return (
					<div key={index}>
						<h3>{name}</h3>
						<table border={1}>
							<thead>
								<tr>
									<th colSpan={7}>{name}</th>
								</tr>
								<tr>
									<th>Dia</th>
									{dias.map(dia => (
										<td
											colSpan={dia.length}
											key={dia.length}>
											{`${diaSemana.slice(
												0,
												3
											)}, ${diaMes} `}
										</td>
									))}
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>Altura</th>
									{windguru.waveHeight.map((wave, index) => (
										<td key={wave + index}>{wave}m</td>
									))}
								</tr>
								<tr>
									<th>Periodo</th>
									{windguru.period.map((period, index) => (
										<td key={period + index}>{period}s</td>
									))}
								</tr>
								<tr>
									<th>Energía</th>
									{surfForecast.energy.map(
										(energy, index) => (
											<td key={energy + index}>
												{energy}
											</td>
										)
									)}
								</tr>
							</tbody>
						</table>
					</div>
				)
			})}
		</div>
	)
}

export default App
