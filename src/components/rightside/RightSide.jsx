import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
// import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
// import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModel/ShareModel";
import { Link } from "react-router-dom";
import Notification from "../utiltity/notification/Notification";

const RightSide = ({ isShow }) => {
  const [modalOpened, setModalOpened] = useState(false);
  let style = { display: isShow ? "flex" : null };
  return (
    <div className="rightSide" style={style}>
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>
        {/* <UilSetting /> */}
        <Link to="../chat">
          <img src={Comment} alt="" />
        </Link>

        <Notification />
      </div>
      {isShow && <TrendCard />}

      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};
export default RightSide;
