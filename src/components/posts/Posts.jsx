import React from "react";
import "./Posts.css";
import Post from "../post/Post";
import GetAllPostsHook from "../hooks/GetAllPosts.Hook";
// import CircularProgress from "@mui/material/CircularProgress";

const Posts = () => {
  const [postData, user] = GetAllPostsHook();

  return (
    <div className="posts">
      {postData.length > 0 ? (
        postData.map((post, id) => {
          return <Post key={id} data={post} user={user} id={post._id} />;
        })
      ) : (
        <p style={{ textAlign: "center", fontWeight: "bold" }}> NO POSTS </p>
      )}
    </div>
  );
};

export default Posts;
