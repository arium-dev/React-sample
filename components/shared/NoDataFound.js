import img from "../../images/no-data-icon.png";
import { GENERIC_MESSAGES } from "../../utils/Constants";

const NoDataFound = ({ message = GENERIC_MESSAGES.NO_RESULTS_TO_DISPLAY }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 flex-grow-1">
      <div>
        <img src={img} alt="" width={50} height={50} />
      </div>
      <p className="text-primary">{message}</p>
    </div>
  );
};

export default NoDataFound;
