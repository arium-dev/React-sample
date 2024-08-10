import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AutoComplete from "../../../../shared/AutoComplete";
import {
  BUTTON_TYPE,
  PERMISSIONS,
  PLACEHOLDERS,
  ZERO,
} from "../../../../../utils/Constants";
import { ADD_NEW_USER, ADD_TO_LIST, SUBMIT, USERS } from "./constants";
import Button from "../../../../shared/Button";
import Table from "./Table";
import {
  addNewUserToList,
  fetchUsers,
  formatPrefillWithdraw,
  getUsersList,
  initialUserValues,
} from "./helper";
import { isAuthorizedAction } from "../../../../../utils";
import Spinner from "../../../../shared/Spinner";

const FormBody = ({
  isSubmitting,
  withdraw,
  editWithdraws,
  setEditWithdraws,
  setWithdraw,
}) => {
  const [users, setUsers] = useState(initialUserValues);
  const [user, setUser] = useState([]);
  const permissions = useSelector((state) => state.auth.permissions);

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  useEffect(() => {
    if (withdraw?.data?.id && editWithdraws?.data?.length === ZERO) {
      formatPrefillWithdraw(withdraw, setEditWithdraws);
    }
    //eslint-disable-next-line
  }, [withdraw]);

  return (
    <>
      <div className="row">
        <div className="col-lg-9 col-sm-12">
          <AutoComplete
            id={USERS}
            placeholder={PLACEHOLDERS.SELECT_USER}
            value={user}
            options={getUsersList(users.data)}
            onChange={(selected) => {
              setUser(selected);
            }}
          />
        </div>
        <div className="col-lg-3 col-sm-12">
          <div className="d-flex gap-2">
            <Button
              type={BUTTON_TYPE.BUTTON}
              onClick={() =>
                addNewUserToList(user, setEditWithdraws, editWithdraws, setUser)
              }
              disabled={user.length === ZERO}
            >
              {ADD_TO_LIST}
            </Button>
          </div>
        </div>
      </div>

      <div className="row">
        {withdraw.withdrawsLoading ? (
          <div className="d-flex align-items-center justify-content-center p-4">
            <Spinner color="primary" />
          </div>
        ) : (
          <Table
            editWithdraws={editWithdraws}
            setEditWithdraws={setEditWithdraws}
          />
        )}
      </div>

      <div className="d-flex justify-content-end border-top">
        <Button
          type={BUTTON_TYPE.SUBMIT}
          className="mt-4"
          disabled={editWithdraws.data.length === ZERO || isSubmitting}
          loading={isSubmitting}
        >
          {SUBMIT}
        </Button>
      </div>
    </>
  );
};

export default FormBody;
