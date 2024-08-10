import React from "react";
import { Col, Table } from "react-bootstrap";
import moment from "moment";
import { GenericConstant } from "../../../../utils/Constants";
import {
  FULL_NAME,
  EMAIL,
  DATE_OF_BIRTH,
  FIRST_NAME,
  LAST_NAME,
  DOB_DATE_FORMAT,
  DOB,
} from "./constants";

const TablePreview = ({ watch }) => {
  return (
    <Col lg={12}>
      <Table responsive>
        <tbody>
          <tr>
            <th className="pl-0 info-th">{FULL_NAME}</th>
            <td className="text-end info-td">
              {watch(FIRST_NAME) + " " + watch(LAST_NAME)}
            </td>
          </tr>
          <tr>
            <th className="pl-0 info-th">{EMAIL}</th>
            <td className="text-end info-td">
              {watch(GenericConstant._EMAIL)}
            </td>
          </tr>
          <tr>
            <th className="pl-0 info-th">{DATE_OF_BIRTH}</th>
            <td className="text-end info-td">
              {moment(watch(DOB)).format(DOB_DATE_FORMAT)}
            </td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );
};

export default TablePreview;
