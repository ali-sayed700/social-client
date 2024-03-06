import React from "react";
import "./ClickResp.css";
import { UilApps } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { UilChat } from "@iconscout/react-unicons";

import AddHomeIcon from "@mui/icons-material/AddHome";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import ModalHook from "../modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import NavIcons from "../navIcon/NavIcons";
import Notification from "../utiltity/notification/Notification";

function ClickResp({ location, proflocation }) {
  let userId = JSON.parse(localStorage.getItem("user"));
  const user = userId ? userId : "";
  const navigate = useNavigate();
  let [isActiveLeft, setIsActiveLeft] = useState(false);
  let [isActiveRight, setIsActiveRight] = useState(false);
  let [isActiveChat, setIsActiveChat] = useState(false);
  let [isActiveProfile, setIsActiveProfile] = useState(false);

  const handleLeftSide = () => {
    setIsActiveLeft(!isActiveLeft);
  };

  const handleRightSide = () => {
    setIsActiveRight(!isActiveRight);
  };

  const handleChat = () => {
    // setIsActiveChat(!isActiveChat);
    navigate("/chat");
  };
  const handleProfile = () => {
    setIsActiveProfile(!isActiveProfile);
  };
  let handleClose = () => {
    setIsActiveLeft(false);
    setIsActiveRight(false);
    setIsActiveChat(false);
    setIsActiveProfile(false);
  };
  let style = {
    color: "var(--orange)",
  };
  return (
    <>
      {isActiveLeft || isActiveRight || isActiveChat || isActiveProfile ? (
        <div className="overlay" onClick={handleClose}></div>
      ) : null}
      <div>
        {isActiveLeft || isActiveRight || isActiveChat || isActiveProfile ? (
          <ModalHook
            isActiveLeft={isActiveLeft}
            isActiveRight={isActiveRight}
            isActiveChat={isActiveChat}
            isActiveProf={isActiveProfile}
          />
        ) : null}
      </div>
      {location === "home" && (
        <div className="icon-resp">
          <div className="icons">
            <div className="icon">
              <UilApps onClick={handleLeftSide} />
            </div>
            <div className="icon">
              <UilBars onClick={handleRightSide} />
            </div>
            <div className="icon">
              <UilChat onClick={handleChat} />
            </div>
            <div className="icon">
              <Link to={`/profile/${user._id}`} style={style}>
                <PersonIcon />
              </Link>
            </div>
            <Notification />
          </div>
        </div>
      )}

      {proflocation === "profRes" && (
        <div className="icon-resp">
          <div className="icons">
            <div className="icon">
              <AddHomeIcon onClick={handleProfile} />
            </div>

            <div className="icon"></div>
            <NavIcons />
          </div>
        </div>
      )}
    </>
  );
}

export default ClickResp;
