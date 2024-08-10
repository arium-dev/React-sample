import React from "react";
import { MODAL_CLASS } from "../../../../utils/Constants";
import ShowModal from "../../../shared/Modal";
import Form from "./Form";
import { userModalText } from "./helper";

const CreateUser = ({ onClose, edit, permissions, setUsers }) => {
  return (
    <ShowModal
      isOpen={true}
      title={userModalText(edit)}
      onClose={onClose}
      dialogClassName={MODAL_CLASS.LG}
    >
      <Form
        onClose={onClose}
        edit={edit}
        permissions={permissions}
        setUsers={setUsers}
      />
    </ShowModal>
  );
};

export default CreateUser;
