// import "./Posts.css";
import React from "react";

import { useParams } from "react-router-dom";
import TimeLineUserHook from "../../hooks/TimeLineUser.Hook";
import UserPost from "../userpost/UserPost";
const UserPosts = () => {
  let { id } = useParams();
  let [userPosts] = TimeLineUserHook(id);

  return (
    <div className="posts">
      {userPosts
        ? userPosts?.map((post, id) => (
          // console.log(id)
            <UserPost key={id} data={post} id={post._id} />
          ))
        : null}
    </div>
  );
};

export default UserPosts;
