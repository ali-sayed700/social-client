// import Modal from "@mui/material/Modal";
import React from "react";

import Modal from "@mui/material/Modal";
import "./ProfileModel.css";

import UpdateUserInfoHook from "../hooks/UpdateUserInfo.Hook";

function ProfileModel({ modalOpened, setModalOpened, data }) {
  const [handleChange, onImageChange, handleSubmit, formData] =
    UpdateUserInfoHook(data, setModalOpened);

  return (
    <Modal
      className="modal"
      keepMounted
      open={modalOpened}
      onClose={() => setModalOpened(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <form className="infoEdit">
        <h3>Your info</h3>

        <div>
          <input
            defaultValue={
              formData.firstname ? formData.firstname : data.firstname
            }
            type="text"
            className="infoInEdit"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            defaultValue={formData.lastname ? formData.lastname : data.lastname}
            type="text"
            className="infoInEdit"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInEdit"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            defaultValue={formData.worksAt ? formData.worksAt : data.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInEdit"
            name="livesin"
            placeholder="LIves in"
            onChange={handleChange}
            defaultValue={formData.livesin ? formData.livesin : data.livesin}
          />

          <input
            type="text"
            className="infoInEdit"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            defaultValue={formData.country ? formData.country : data.country}
          />
        </div>

        <div>
          <input
            name="relationship"
            type="text"
            className="infoInEdit"
            placeholder="RelationShip Status"
            onChange={handleChange}
            defaultValue={
              formData.relationship ? formData.relationship : data.relationship
            }
          />
        </div>

        <div className="choseimg">
          <div m={2}>
            Profile Image
            <input type="file" name="profileImg" onChange={onImageChange} />
          </div>
          <div>
            Cover Image
            <input type="file" name="coverImg" onChange={onImageChange} />
          </div>
        </div>

        <button onClick={handleSubmit} className="button infoButton">
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileModel;
