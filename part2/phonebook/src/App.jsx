import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterCriteria, setFilterCriteria] = useState('')

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value)
  }

  const personsArray = 
  filterCriteria === '' ?
  persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
  :
  persons.filter((person) => person.name.toLowerCase().startsWith(filterCriteria)).map((person) => <p key={person.name}>{person.name} {person.number}</p>)

  const addPerson = (event) => {
    event.preventDefault();

    const results = persons.filter(person => person.name.toLowerCase() === newName);

    results.length !== 0 ?
      alert(`${newName} is already added to phonebook`)
    :
      setPersons(persons.concat({name: newName, number: newNumber}));
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filterCriteria} onChange={(e) => handleChange(e, setFilterCriteria)}/></div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => handleChange(e, setNewName)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => handleChange(e, setNewNumber)}/></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsArray}
    </div>
  )
}

export default App