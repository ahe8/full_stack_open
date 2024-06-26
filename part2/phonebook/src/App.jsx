import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from "./services/person"

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll()
    .then(persons => setPersons(persons))
    .catch(err => console.err(err.response));
  }, [])

  const [filterCriteria, setFilterCriteria] = useState('')

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterCriteria={filterCriteria} 
        setFilterCriteria={setFilterCriteria} 
        handleChange={handleChange}
      />
      
      <h2>add a new</h2>
      <PersonForm 
        persons={persons} 
        handleChange={handleChange} 
        setPersons={setPersons} 
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filterCriteria={filterCriteria} 
        setPersons={setPersons}
      />
    </div>
  )
}

export default App