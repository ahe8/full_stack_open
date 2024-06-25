const Persons = (props) => {
    const { filterCriteria, persons } = props;
    
    const personsArray = filterCriteria === '' ? (
        persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
    ): (
        persons
        .filter((person) => person.name.toLowerCase().startsWith(filterCriteria))
        .map((person) => <p key={person.name}>{person.name} {person.number}</p>)
    );

    return personsArray;
}

export default Persons