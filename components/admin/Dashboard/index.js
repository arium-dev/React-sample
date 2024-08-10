import { React } from "react";
import Chart from "./Chart/index";
import Transactions from "./Transactions";
import Details from "./Details/index";

const Dashboard = () => {
  return (
    <>
      <Transactions />
      <Details />
      <Chart />
    </>
  );
};

export default Dashboard;
