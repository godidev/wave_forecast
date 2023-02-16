import React, { useState, useEffect } from 'react';
import axios from 'axios'
function App() {
  const [forecast, setForecast] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/forecast')
    .then(({data}) => setForecast(data))
  }, [])

  console.log({forecast})
  return (
    <div className="App">
      {forecast.map(({name, webpages}) => {
        const {windguru, surfForecast} = webpages
        return (
          <div>
            <h3>{name}</h3>
            <table border={1}>
              <thead>
                <tr>
                  <th colSpan={7}>{name}</th></tr>
                <tr>
                  <th>Hora</th>
                  {surfForecast.time.map(wave => <td>{wave}</td>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                <th>Altura</th>
                  {windguru.waveHeight.map(wave => <td>{wave}m</td>)}
                </tr>
                <tr>
                <th>Periodo</th>
                  {windguru.period.map(wave => <td>{wave}s</td>)}
                </tr>
                <tr>
                <th>Energía</th>
                  {surfForecast.energy.map(wave => <td>{wave}</td>)}
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
