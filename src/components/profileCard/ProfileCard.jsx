import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import AvatarImg from "../../img/User-avatar.svg.png";
// import { Link } from "react-router-dom";
import ProfileCardHook from "../hooks/ProfileCard.Hook";
import TimeLineUserHook from "../hooks/TimeLineUser.Hook";
import { Link, useParams } from "react-router-dom";
function ProfileCard({ location }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [userItem] = ProfileCardHook(user && user._id);
  const [userPosts] = TimeLineUserHook(user && user._id);
  const { id } = useParams();

  return (
    <div className="profileCard">
      <div className="profileImages">
        <PhotoProvider>
          <PhotoView
            src={userItem.coverPicture ? userItem.coverPicture : Cover}
          >
            <img
              src={userItem.coverPicture ? userItem.coverPicture : Cover}
              alt=""
            />
          </PhotoView>
        </PhotoProvider>
        <PhotoProvider>
          <PhotoView
            src={userItem.profilePicture ? userItem.profilePicture : AvatarImg}
          >
            <img
              src={
                userItem.profilePicture ? userItem.profilePicture : AvatarImg
              }
              alt=""
            />
          </PhotoView>
        </PhotoProvider>
      </div>

      <div className="profileName">
        <span>
          {userItem.firstname} {userItem.lastname}
        </span>
        <span>{userItem.worksAt ? userItem.worksAt : "write your work"}</span>
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
          {location === "ProfilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span> {userPosts.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      <span>
        {id === user._id ? (
          ""
        ) : (
          <Link
            to={`/profile/${userItem._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        )}
      </span>
    </div>
  );
}

export default ProfileCard;
