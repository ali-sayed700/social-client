import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import "./ProfileSide.css";
import "../logoSearch/LogoSearch.css";
const ProfileSide = ({ isShow }) => {
  // const user = JSON.parse(localStorage.getItem("user"));
  let style = { display: isShow ? "flex" : null };
  return (
    <div className="profileSide" style={style}>
      <LogoSearch />
      <ProfileCard location="ProfilePage" />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
