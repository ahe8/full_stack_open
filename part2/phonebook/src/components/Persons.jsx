import personService from '../services/person'

const Persons = (props) => {
    const { filterCriteria, persons, setPersons, setNotificationMessage, setNotificationType } = props;

    const handleDelete = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(person.id)
            .then(res => setPersons(persons.filter(person => person.id !== res.id)))
            .catch(err => {
                setNotificationMessage(`Information of ${person.name} has already been removed from the server`)
                setNotificationType("error");
                console.log(err);
            })
          }
    }
    
    const personsArray = 
        persons.filter((person) => person.name.toLowerCase().startsWith(filterCriteria.toLowerCase()))
        .map((person) => {
            return(
                <div key={person.id}>
                    {person.name} {person.number}    
                    <button onClick={() => handleDelete(person)}>delete</button>  
                </div>
            )
        });

    return personsArray;
}

export default Persons