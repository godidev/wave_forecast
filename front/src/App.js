import { useState, useEffect } from 'react'
import axios from 'axios'
import Row from './components/Row'
import DaysRow from './components/DaysRow'

function App() {
	const [forecast, setForecast] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3001/api/forecast').then(({ data }) => {
			setForecast(data[0].forecast)
		})
	}, [])

	return (
		<div className='App'>
			{forecast.map(({ name, webpages }, index) => {
				const { windguru, surfForecast } = webpages

				return (
					<div key={index}>
						<h3>{name}</h3>
						<table border={1}>
							<thead>
								<tr>
									<th colSpan={7}>{name}</th>
								</tr>
								<DaysRow hours={surfForecast.time} />
							</thead>
							<tbody>
								<Row
									data={windguru.waveHeight}
									text='Altura'
									magnitude='m'
								/>
								<Row
									data={windguru.period}
									text='Periodo'
									magnitude='s'
								/>
								<Row
									data={surfForecast.energy}
									text='Energia'
								/>
							</tbody>
						</table>
					</div>
				)
			})}
		</div>
	)
}

export default App
