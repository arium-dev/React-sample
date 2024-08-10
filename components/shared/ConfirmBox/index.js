import Swal from "sweetalert2";
import { ALERT, ALERT_HEADING, CANCEL, CONFIRM, WARNING } from "../Constants";

export const sweetAlert = (
  title = ALERT,
  text = ALERT_HEADING,
  row,
  confirmButtonText = CONFIRM,
  cancelButtonText = CANCEL,
  icon = WARNING
) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      titleText: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        return resolve(row);
      } else {
        return reject({ message: CANCEL });
      }
    });
  });
};
