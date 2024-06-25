import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '040-123456'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value)
  }

  const personsArray = persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)

  const addPerson = (event) => {
    event.preventDefault();

    const results = persons.filter(person => person.name === newName);

    results.length !== 0 ?
      alert(`${newName} is already added to phonebook`)
    :
      setPersons(persons.concat({name: newName, number: newNumber}));
  }


  return (
    <div>
      <h2>Phonebook</h2>
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