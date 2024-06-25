const Filter = (props) => {
    const { filterCriteria, setFilterCriteria, handleChange } = props;    

    return (
        <div>
            filter shown with <input value={filterCriteria} onChange={(e) => handleChange(e, setFilterCriteria)}/>
        </div>
    )
}

export default Filter