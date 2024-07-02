import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import NotificationMessage from './components/NotificationMessage'
import personService from "./services/person"

const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')
  const [filterCriteria, setFilterCriteria] = useState('')

  useEffect(() => {
    personService.getAll()
    .then(persons => setPersons(persons))
    .catch(err => console.error(err.response));
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setNotificationMessage('');
      setNotificationType('');
    }, 3000);
  }, [notificationMessage])

  const handleChange = (event, setFunction) => {
    setFunction(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage type={notificationType} message={notificationMessage} />
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
        setNotificationType={setNotificationType}
        setNotificationMessage={setNotificationMessage}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filterCriteria={filterCriteria} 
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
        setNotificationType={setNotificationType}
      />
    </div>
  )
}

export default App