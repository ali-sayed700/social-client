import React from "react";
import ProfileOtherLeft from "../followersCard/profileOtherLeft/ProfileOtherLeft";

import ProfileCardOther from "../profileCardOthers/ProfileCardOther";
import ShowPostsOther from "../showPostsOthers/ShowPostsOther";
import RightSide from "../rightside/RightSide";
import {  useParams } from "react-router-dom";

function ShowOthers() {
  let user = JSON.parse(localStorage.getItem("user"))
  let {id} = useParams()

  return (
    <div className="profile">
    {id === user._id ? (
      <p>got to your profile</p>
     ) : (
       <>
      <ProfileOtherLeft />
      <div className="profile-center">
        <ProfileCardOther location="ProfilePage" />
        <ShowPostsOther />
      </div>
      <RightSide location="model" />
     </>
     )
     
     
     
    }
        {/* //   <ProfileOtherLeft />
        //   <div className="profile-center">
        //     <ProfileCardOther location="ProfilePage" />
        //     <ShowPostsOther />
        //   </div>
        //   <RightSide location="model" />
        // </div> */}

        
    
     </div>
  );
}

export default ShowOthers;
