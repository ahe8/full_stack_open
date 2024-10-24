import { useNotificationValue } from "../NotificationContext"


const Notification = () => {
  const notificationValue = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={notificationValue ? style : {display:'none'}}>
      {notificationValue}
    </div>
  )
}

export default Notification
