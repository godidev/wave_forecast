import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from './components/Table/Table'
import './App.css'

function App() {
	const [forecast, setForecast] = useState([])

	useEffect(() => {
		axios.get('http://localhost:3001/api/forecast').then(({ data }) => {
			setForecast(data[0].forecast)
		})
	}, [])

	return (
		<div className='App'>
			<Table forecast={forecast} />
		</div>
	)
}

export default App
