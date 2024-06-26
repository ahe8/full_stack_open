const NotificationMessage = (props) => {
    return (
        props.message && 
        <p className={props.type}>
            {props.message}
        </p>
    )
}

export default NotificationMessage