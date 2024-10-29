const Notify = ({ message }) => {
    const style = {
        border: '1px solid black',
        display: `${message ? 'block' : 'none'}`
    }
    return (
        <div style={style}>
            <h2>{message}</h2>
        </div>
    )
}

export default Notify