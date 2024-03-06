import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "../profileCard/ProfileCard.css";
import Cover from "../../img/cover.jpg";
import AvatarImg from "../../img/User-avatar.svg.png";
import { Link, useParams } from "react-router-dom";
import TimeLineUserHook from "../hooks/TimeLineUser.Hook";
import ProfileOtherCardHook from "../hooks/ProfileOtherCardHook";
function ProfileCardOther() {
  // const user = JSON.parse(localStorage.getItem("user"));
  let { id } = useParams();
  const [userItem] = ProfileOtherCardHook(id);
  const [userPosts] = TimeLineUserHook(id);
  return (
    <div className="profileCard">
      <div className="profileImages">
        <PhotoProvider>
          <PhotoView src={userItem.coverPicture  ? userItem.coverPicture : Cover}>
            <img
              src={userItem.coverPicture ? userItem.coverPicture : Cover}
              alt=""
            />
          </PhotoView>
        </PhotoProvider>
        <PhotoProvider>
          <PhotoView src={userItem.profilePicture ? userItem.profilePicture : AvatarImg}>
            <img
              src={userItem.profilePicture ? userItem.profilePicture : AvatarImg}
              alt=""
            />
          </PhotoView>
        </PhotoProvider>
      </div>

      <div className="profileName">
        <span>
          {userItem.firstname} {userItem.lastname}
        </span>
        <span>{userItem.worksAt  ? userItem.worksAt : "write your work"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {Array.isArray(userItem.following)
                ? userItem.following.length
                : null}
            </span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {Array.isArray(userItem.following)
                ? userItem.followers.length
                : null}
            </span>
            <span>Followers</span>
          </div>

          <div className="vl"></div>
          <div className="follow">
            <span> {userPosts.length}</span>
            <span>Posts</span>
          </div>
        </div>
        <hr />
      </div>
      <span>
        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        </span>
    </div>
  );
}

export default ProfileCardOther;
