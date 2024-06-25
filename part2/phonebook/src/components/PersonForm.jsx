import { useState } from "react";

const PersonForm = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const { persons, handleChange, setPersons } = props;
    
    const addPerson = (event) => {
        event.preventDefault();
    
        const results = persons.filter(person => person.name.toLowerCase() === newName);
    
        results.length !== 0 ?
          alert(`${newName} is already added to phonebook`)
        :
          setPersons(persons.concat({name: newName, number: newNumber}));
      }

    return (
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
    )
}

export default PersonForm