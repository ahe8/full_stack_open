import PropTypes from 'prop-types'

const NotificationMessage = (props) => {
    return (
        props.message &&
        <p className={props.type}>
            {props.message}
        </p>
    )
}

NotificationMessage.propTypes = {
    types: PropTypes.oneOf(['success', 'error'])
}

export default NotificationMessage