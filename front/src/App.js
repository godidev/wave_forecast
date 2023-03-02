import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from './components/Table/Table'
import './App.css'

function App() {
	const [forecast, setForecast] = useState([])

	useEffect(() => {
		axios.get('/forecast').then(({ data }) => {
			setForecast(data)
		})
	}, [])

	return (
		<div className='App'>
			<Table forecast={forecast} />
		</div>
	)
}

export default App
