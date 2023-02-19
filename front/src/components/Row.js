export default function Row({ data, text, magnitude = '' }) {
	return (
		<tr>
			<th>{text}</th>
			{data.map((item, index) => (
				<td key={item + index}>
					{item}
					{magnitude}
				</td>
			))}
		</tr>
	)
}
