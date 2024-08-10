import React from "react";
import Loader from "react-spinners/ClipLoader";

const Spinner = ({ loading = true, color = "#FFFFFF", size = 16 }) => {
  return <Loader loading={loading} color={color} size={size} />;
};

export default Spinner;
