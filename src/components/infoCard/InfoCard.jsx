import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
// import ProfileModal from "../profileModal/ProfileModal";

import ProfileModel from "../profileModel/ProfileModel";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import GetSpecifcUserHook from "../hooks/GetSpecifcUser.Hook";
// import { GetOneUser } from "../../reducers/user/Get.SpecificUser";

const InfoCard = () => {
  const { id } = useParams();
  const [userSpicfic] = GetSpecifcUserHook(id);

  let userId = JSON.parse(localStorage.getItem("user"));
  let user = userId ? userId : "";

  const [modalOpened, setModalOpened] = useState(false);

  const HandleOut = async () => {
    localStorage.clear();

    window.location.replace("http://localhost:3000/auth");
  };

  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        {user._id === id ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />

            <ProfileModel
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={userSpicfic}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>
          {userSpicfic.relationship === "undefined"
            ? ""
            : userSpicfic.relationship}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>
          {userSpicfic.worksAt === "undefined" ? "" : userSpicfic.worksAt}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>
          {userSpicfic.livesin === "undefined" ? "" : userSpicfic.livesin}
        </span>
      </div>
      {user._id === id ? (
        <button className="button logout-button" onClick={HandleOut}>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default InfoCard;
