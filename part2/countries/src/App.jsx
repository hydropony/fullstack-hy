import { useState, useEffect } from 'react'
import axios from 'axios'

const getCountries = () => {
  return (
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
  )
}

const Country = ({country, handleClick}) => {
  return (
    <div>
      <p>{country.name.common} <button onClick={() => handleClick(country.name.common)}>show</button></p>
    </div>
  )
}

const CountryDetailed = ({country}) => {
  // console.log(country)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>Languages:</b>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} width={"15%"}></img>
      <Weather country={country}></Weather>
    </div>
  )
}

const Countries = ({countries, search, handleClick}) => {
  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  // console.log(filtered)
  if (filtered.length == 1) {
    return <CountryDetailed country={filtered[0]}></CountryDetailed>
  }
  if (filtered.length < 10) {
    return (
      <div>
        {filtered.map(country => <Country country={country} handleClick={handleClick} key={country.name.common}></Country>)}
      </div>
    )
  }
  else {
    return (
      <div>
        Too many matches
      </div>
    )
  }
}

const Weather = ({country}) => {
  const key = import.meta.env.VITE_SOME_KEY
  const [weather, setWeather] = useState(null)

  useEffect(() => {
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${key}`)
    .then(response => setWeather(response.data))
    .then(response => console.log(weather))
  }, [])

  if (weather === null) return
  
  return (
    <div>
      <h4>Weather in {country.capital[0]}</h4>
      <p>Temperature: {(weather.main.temp - 273.15).toPrecision(4)} C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}
 
function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleClick = (countryname) => {
    // console.log(countryname)
    setSearch(countryname)
  }

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    event.preventDefault()
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .then(console.log(countries))
    // console.log("countryvalue", countries)
  }, [])
  
  return (
   <div>
    find countries <input onChange={handleSearchChange}></input>
    <Countries countries={countries} search={search} handleClick={handleClick}></Countries>
   </div>
  )
}

export default App
