import React from "react";
// import PostShare from "../postShare/PostShare";
// import "./PostSide.css";
import UserPosts from "../userposts/UserPosts";
import PostShare from "../../postShare/PostShare";

function UserPostSide() {
  return (
    <div className="postSide">
      <PostShare />
      <UserPosts />
    </div>
  );
}

export default UserPostSide;
