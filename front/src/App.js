import React, { useState, useEffect } from 'react';
import axios from 'axios'

function getNumbers (times) {
  const res = times.map(time => {
    const sum = time.includes('PM') ? 12 : 0
    const finalTime = Number(time.slice(0, -3)) + sum
    return finalTime === 24 ? 0 : finalTime
  })
  return res
}

function App() {
  const [forecast, setForecast] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/forecast')
    .then(({data}) => setForecast(data))
  }, [])

  return (
    <div className="App">
      {forecast.map(({name, webpages}) => {
        const {windguru, surfForecast} = webpages
        console.log(getNumbers(surfForecast.time))
        return (
          <div>
            <h3>{name}</h3>
            <table border={1}>
              <thead>
                <tr>
                  <th colSpan={7}>{name}</th></tr>
                <tr>
                  <th>Hora</th>
                  {surfForecast.time.map(time => <td>{time}</td>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                <th>Altura</th>
                  {windguru.waveHeight.map(wave => <td>{wave}m</td>)}
                </tr>
                <tr>
                <th>Periodo</th>
                  {windguru.period.map(period => <td>{period}s</td>)}
                </tr>
                <tr>
                <th>Energía</th>
                  {surfForecast.energy.map(energy => <td>{energy}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  );
}

export default App;
