import { useAppSelector } from "hooks/redux";
import snackbarStyles from "../UI-Kit/Snackbar/Snackbar.module.scss";
import notificationStyles from "../UI-Kit/Notification/Notification.module.scss";
import Snackbar from "components/UI-Kit/Snackbar/Snackbar";
import Notification from "components/UI-Kit/Notification/Notification";

function Messages() {
  const snackbars = useAppSelector((state) => state.messages.showSnackbar);
  const notifications = useAppSelector(
    (state) => state.messages.showNotifications
  );

  return (
    <>
      {/* {messages.showModalVariant === "createFolder" && <ModalCreateFolder />} */}
      <div className={notificationStyles.notificationsBox}>
        {!!notifications.length &&
          notifications.map((notification, index) => (
            <Notification data={notification} key={notification._id + index} />
          ))}
      </div>
      <div className={snackbarStyles.snackbarBox}>
        {!!snackbars.length &&
          snackbars.map((snackbar, index) => (
            <Snackbar data={snackbar} key={snackbar.id + index} />
          ))}
      </div>
    </>
  );
}

export default Messages;
