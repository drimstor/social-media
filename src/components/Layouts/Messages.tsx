import { useAppSelector } from "hooks/redux";
import snackbarStyles from "../UI-Kit/Snackbar/Snackbar.module.scss";
import Snackbar from "components/UI-Kit/Snackbar/Snackbar";

function Messages() {
  const messages = useAppSelector((state) => state.messages);
  return (
    <>
      {/* {messages.showModalVariant === "createFolder" && <ModalCreateFolder />} */}

      <div className={snackbarStyles.snackbarBox}>
        {!!messages.showSnackbar.length &&
          messages.showSnackbar.map((snackbar) => (
            <Snackbar data={snackbar} key={snackbar.id} />
          ))}
      </div>
    </>
  );
}

export default Messages;
