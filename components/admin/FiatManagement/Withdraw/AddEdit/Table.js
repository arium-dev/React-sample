import React from "react";
import TableBody from "../../../../shared/Table/TableBody";
import TableRow from "./TableRow";
import { addEditWithdrawHeader } from "./constants";

const TableShow = ({ editWithdraws, setEditWithdraws }) => {
  return (
    <TableBody loading={false} header={addEditWithdrawHeader}>
      {editWithdraws.data.length > 0 &&
        editWithdraws.data.map((withdraw) => {
          return (
            <TableRow
              key={withdraw?.id}
              withdraw={withdraw}
              setEditWithdraws={setEditWithdraws}
            />
          );
        })}
    </TableBody>
  );
};

export default TableShow;
