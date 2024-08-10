import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "../../shared/Table";
import { ONE } from "../../../utils/Constants";
import { fetchUsers, initialUserValue, userActionHandler } from "./helper.js";
import UserRow from "./UserRow";
import { initialUsersValue } from "./helper";
import { headerUsersValues } from "./helper";
import CreateUser from "./CreateUser";

const User = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState(
    initialUsersValue(searchParams?.get("search"))
  );

  const [user, setUser] = useState(initialUserValue);

  useEffect(() => {
    if (!searchParams?.get("search")) {
      fetchUsers(users.page, users.search, setUsers);
    }

    //eslint-disable-next-line
  }, []);

  const handleSearch = useCallback((search) => {
    setUsers((prev) => ({ ...prev, search }));
    fetchUsers(ONE, search, setUsers);
  }, []);

  const handlePagination = useCallback(
    (page) => {
      setUsers((prev) => ({ ...prev, page }));
      fetchUsers(page, users.search, setUsers);
    },
    [users]
  );

  const handleRefresh = useCallback(() => {
    fetchUsers(ONE, users.search, setUsers);
  }, [users]);

  const actionHandler = useCallback((action, value) => {
    userActionHandler(action, value, setUsers, setUser);
  }, []);

  const onCloseEditUser = useCallback(() => {
    setUser(initialUserValue);
  }, []);

  return (
    <>
      <Table
        loading={users.loading}
        search={users.search}
        handleSearch={handleSearch}
        header={headerUsersValues}
        bodyusers={users.list}
        limit={users?.offset}
        total={users?.total}
        page={users?.page}
        handlePagination={handlePagination}
        handleRefresh={handleRefresh}
      >
        {users.list.length > 0 &&
          users.list.map((row) => (
            <UserRow
              key={row?._id}
              user={row}
              setUsers={setUsers}
              actionHandler={actionHandler}
            />
          ))}
      </Table>

      {user?.isOpen && (
        <CreateUser
          edit={user?.user}
          onClose={onCloseEditUser}
          setUsers={setUsers}
        />
      )}
    </>
  );
};

export default User;
