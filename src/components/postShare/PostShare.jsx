import React, { useState } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
// import { UilLocationPoint } from "@iconscout/react-unicons";
// import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";

import AvatarImg from "../../img/User-avatar.svg.png";
import CreatePostHook from "../hooks/CreatePost.Hook";

function PostShare() {
  const [
    onImageChange,
    handleUpload,
    loading,
    imageRef,
    desc,
    image,
    setImage,
    user,
    VideoRef,
    setVideo,
    video,
    onVideoChange,

  ] = CreatePostHook();
  
  let [ colorItem , setColorItem] = useState('')

  const HandleColor = (e) => {

    setColorItem(e.target.value)
  }

  const handleEmpty = () => {
    setImage('');
    setVideo('');
    VideoRef.current.value = '';
    imageRef.current.value = '';
  }


  let styleColor = {
     color: colorItem.match(/#\w+/g) && "blue"  
  }

  return (
    <div className="postShare">
      <img  src={user.profilePicture ? user.profilePicture : AvatarImg} alt="" />
      <div>
        <input ref={desc} onChange={HandleColor}  style={styleColor} type="text" placeholder="What's happening" />

        {/* <input  type="text" placeholder="What's happening" /> */}
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => VideoRef.current.click()}>
            <UilPlayCircle />
            Video
          </div>
     
          {video || image ||colorItem ? (
 <button
 className="button ps-button"
 onClick={handleUpload}
 disabled={loading}>
 {loading ? "uploading" : "Share"}
</button>

          ) : null}
   
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />

            <input
              type="file"
              name="myVideo"
              ref={VideoRef}
              onChange={onVideoChange}
            />
          </div>
        </div>
        {image ? (
          <div className="previewImage">
            <UilTimes onClick={handleEmpty}/>
            <img src={  image ? URL.createObjectURL(image) : URL.createObjectURL(null)} alt="preview" />
          </div>
        ):null}

        {video ? (
          <div className="previewImage">
            <UilTimes onClick={handleEmpty} />
            <video
              src={
                video ? URL.createObjectURL(video) : URL.createObjectURL(null)
              }
              type="video/mp4"
              alt="video"
              width="300"
              height="300"
            />
          </div>
        ):null}
      </div>
    </div>
  );
}

export default PostShare;
