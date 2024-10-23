import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(changeFilter(event.target.value))
    }

    const style = {
        marginBottom: 10
    }

    return (
    <div style={style}>
        filter <input onChange={handleChange} name='filter'/>
    </div>
    )
}

export default Filter