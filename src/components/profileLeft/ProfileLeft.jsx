import React from "react";
// import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";
import LogoSearch from "../logoSearch/LogoSearch";
import "./ProfileLeft.css";
const ProfileLeft = ({ isShow }) => {
  let style = { display: isShow ? "flex" : null };
  // class profileSide is the same in profileLeft 
  return (
    <div className="profileSide" style={style}>
      <LogoSearch />

      <InfoCard />
    </div>
  );
};

export default ProfileLeft;
