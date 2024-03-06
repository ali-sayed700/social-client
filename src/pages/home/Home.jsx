import React from "react";
import "./Home.css";
import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/postSide/PostSide";
import RightSide from "../../components/rightside/RightSide";
import ClickResp from "../../components/responsiveCard/ClickResp";




function Home() {

  if(localStorage.getItem("user") === "undefined") {
    localStorage.clear();
  
    window.location.reload();

  }

  return (
    <div className="home">
      <ProfileSide />
      <PostSide />
      <RightSide isShow='' />
      {/* <ModalHook /> */}
      <ClickResp location="home" />
      {/* <Notification/> */}
    </div>
  );
}

export default Home;
