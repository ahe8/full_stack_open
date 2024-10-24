import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

    const [country, setCountry] = useState(null)

    useEffect(() => {
        if(name) {
            axios.get(`${baseUrl}/name/${name}`)
                .then(res => setCountry({...res.data, found:true}))
                .catch(err => setCountry({found:false}))
        }
    }, [name])

    return country
}