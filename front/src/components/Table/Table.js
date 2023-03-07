import Row from './Row'
import DaysRow from './DaysRow'
import './Table.css'

export default function Table({ forecast }) {
	console.log('forecast', forecast)
	console.log('tipo:', typeof forecast)

	if (Array.isArray(forecast)) {
		return forecast.map(({ webpages }, index) => {
			const { windguru, surfForecast } = webpages

			return (
				<table key={index} className='table-content'>
					<thead className='table-header'>
						<DaysRow hours={surfForecast.time} />
						<Row data={surfForecast.time} text='Hora' />
					</thead>
					<tbody className='table-body'>
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
						<Row data={surfForecast.energy} text='Energia' />
					</tbody>
				</table>
			)
		})
	} else {
		return <p>Error</p>
	}
}
