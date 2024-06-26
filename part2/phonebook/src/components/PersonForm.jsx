import { useState } from "react";
import personService from "../services/person"

const PersonForm = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const { persons, handleChange, setPersons, setNotificationType, setNotificationMessage } = props;
    
    const addPerson = (event) => {
        event.preventDefault();
    
        const results = persons.find(person => person.name === newName);

        if (results) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService.update(results.id, {name: newName, number: newNumber})
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
                    setNotificationMessage(`${newName}'s number has been updated to ${newNumber}`);
                    setNotificationType("success");
                })
                .catch(err => console.log(err))
            }
        } else {
            personService.create({name: newName, number: newNumber})
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNotificationMessage(`Added ${newName}`);
                setNotificationType("success");
            })
            .catch(err => console.log(err));
        }
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