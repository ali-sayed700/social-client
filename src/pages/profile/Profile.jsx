import React from "react";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import RightSide from "../../components/rightside/RightSide";
import ProfileCard from "../../components/profileCard/ProfileCard";
import "./Profile.css";
import UserPostSide from "../../components/userPost/userPostSide/UserPostSide";
import ClickResp from "../../components/responsiveCard/ClickResp";
// import { useDispatch, useSelector } from "react-redux";
// import { GetOneUser } from "../../reducers/user/Get.SpecificUser";
// import { useParams } from "react-router-dom";

function Profile() {
  // let user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="profile">
      <ProfileLeft />

      <div className="profile-center">
        <ProfileCard location="ProfilePage" />
        <UserPostSide />
      </div>

      <RightSide isShow="" />
      <ClickResp proflocation="profRes" />
    </div>
  );
}

export default Profile;
