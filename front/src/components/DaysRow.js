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

export default function DaysRow({ hours }) {
	hours = getNumbers(hours)
	let temp = []
	const dias = []

	hours.forEach((hora, index) => {
		temp.push(hora)
		if (hora >= 21 || index === hours.length - 1) {
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
		<tr>
			<th>Dia</th>
			{dias.map(dia => (
				<td colSpan={dia.length} key={dia.length}>
					{`${diaSemana.slice(0, 3)}, ${diaMes} `}
				</td>
			))}
		</tr>
	)
}
