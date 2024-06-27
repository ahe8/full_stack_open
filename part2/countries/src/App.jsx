import { useState, useEffect } from "react"
import countryService from './services/countries'
import Country from "./components/Country"

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState({})

  useEffect(() => {
    countryService.getAll()
    .then(data => { 
      setCountries(data);
      
      let showCountryInit = {};
      data.forEach(country => {
        showCountryInit[country['name']['common']] = false;
      })
      setShowCountry(showCountryInit);
    })
    .catch(err => console.log(err))
  }, [])


  const handleChange = (e) => {
    setCountryName(e.target.value);
  }

  const filteredCountries = countries
    .filter((country) => {
      return country['name']['common'].toLowerCase().startsWith(countryName.toLowerCase());
    })
    

  const toggleCountry = (country) => {
    const currCountryName = country['name']['common'];

    let newCountryObj = {...showCountry}
    newCountryObj[currCountryName] = !showCountry[currCountryName];

    setShowCountry(newCountryObj);
  }

  const countriesArray = filteredCountries.map((country) => {
    const currCountryName = country['name']['common'];

    return (
      <div key={country['cca2']}>
        {currCountryName} <button onClick={() => toggleCountry(country)}>{showCountry[currCountryName] ? "hide" : "show"}</button>
        {showCountry[currCountryName] && <Country country={country}/>}
      </div>
    )
  })

  return (
    <div>
      find countries<input value={countryName} onChange={handleChange}/>
      {countryName && (
        filteredCountries.length === 1 ? <Country country={filteredCountries[0]}/> : countriesArray
      )}
    </div>
  )
}


export default App
