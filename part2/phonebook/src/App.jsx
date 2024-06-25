import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
      />
    </div>
  )
}

export default App