import Weather from "./Weather";

const Country = (props) => {
    const { country } = props;

    const languagesArray = Object.values(country['languages'])
        .map(language => <li key={language}>{language}</li>)

    return (
        <div>
            <h1>{country['name']['common']}</h1>
            <p>{`capital ${country['capital']}`}</p>
            <p>{`area ${country['area']}`}</p>

            <h3>languages:</h3>
            <ul>
                {languagesArray}
            </ul>

            <img src={country['flags']['png']} alt={country['flags']['alt']} />

            <Weather capital={country['capital']}/>
        </div>
    )

}

export default Country