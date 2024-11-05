import { useSelector } from "react-redux";

const NotificationMessage = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <div
      className={notification.type}
      style={{ display: notification.type ? "block" : "none" }}
    >
      {notification.message}
    </div>
  );
};

export default NotificationMessage;
