// import ReactWebMediaPlayer from "react-web-media-player";
import React from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector } from "react-redux";
// import { LikesApi } from "../../reducers/post/Get.Likes";
import AddLikePostHook from "../hooks/AddLikePost.Hook";
import { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import ReactPlayer from "react-player";
import ReadMore from "../utiltity/ReadMore";
import { CreateCommentApi } from "../../reducers/comment/CreateComment";

import { GetCommentApi } from "../../reducers/comment/GetComments";
import { GetOnePostsApi } from "../../reducers/post/Get.SpecificPost.Reducer";

// import { CreatePostApi } from "../../reducers/post/Upload.Posts";
import { CreatePostsApi } from "../../reducers/post/Create.Post";
// import { CreatePostsApi } from "../../reducers/post/Create.Post";
// import { CreatePostApi } from "../../reducers/post/Upload.Posts";
import DefaultImg from "../../img/User-avatar.svg.png";
import { useNavigate } from "react-router-dom";
import Socket from "../../pages/socket/Socket";
import CircularProgress from "@mui/material/CircularProgress";
const Post = ({ data, user, id }) => {
  const [socket] = Socket();

  const userId = JSON.parse(localStorage.getItem("user"));
  const [HandleLike, likes, liked, namePost, imageProf, idUser, lastnamePost] =
    AddLikePostHook(data, userId);

  const navigate = useNavigate();
  let dispatch = useDispatch();
  let comInput = useRef();
  let [showCo, setShowCo] = useState(false);
  let [isloading, setIsLoading] = useState(true);
  let [saveComm, setSaveComm] = useState("");
  let [comment, setComment] = useState([]);
  let [sharePost, setSharePost] = useState({});
  let [userReciver, setUserReciver] = useState("");

  let [loading, setLoading] = useState(true);
  let { comPost } = useSelector((state) => state.CreateComm);

  let { GetcomPost } = useSelector((state) => state.GetComment);
  // const {likesList} =  useSelector((state) => state.likesClick);

  const ShowComment = (e) => {
    setShowCo(!showCo);
  };

  useEffect(() => {
    let get = async () => {
      setLoading(true);
      await dispatch(GetCommentApi(id));
      setLoading(false);
    };
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comPost]);
  useEffect(() => {
    if (!loading) {
      setComment(GetcomPost.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleComment = (e) => {
    setSaveComm(e.target.value);
  };

  const sendComment = async () => {
    let format = {
      comment: saveComm,
    };

    await dispatch(CreateCommentApi({ id, format }));
    handleNotification(2);
    setSaveComm("");
    comInput.current.value = "";
  };

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  // ***Here is code for converting "Base64" to javascript "File Object".***

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  let { GetPost } = useSelector((state) => state.GetOnePost);

  const HandleShare = async () => {
    setIsLoading(true);

    await dispatch(GetOnePostsApi(id));

    handleNotification(3);
    setIsLoading(false);
  };
  useEffect(() => {
    setSharePost(GetPost.data);
    if (!isloading) {
      if (sharePost) {
        async function get(sharePost) {
          let data = new FormData();
          if (sharePost.image) {
            await toDataURL(sharePost.image).then((dataUrl) => {
              let fileData = dataURLtoFile(dataUrl, Math.random() + ".jpeg");
              return data.append("image", fileData);
            });
          }
          if (sharePost.video) {
            await toDataURL(sharePost.video).then((dataUrl) => {
              let fileData = dataURLtoFile(dataUrl, Math.random() + ".mp4");

              return data.append("video", fileData);
            });
          }
          if (sharePost.desc) {
            data.append("desc", sharePost.desc);
          }
          data.append("user", userId._id);
          await dispatch(CreatePostsApi(data));
          setSharePost({});
          setIsLoading(true);
        }
        get(sharePost);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isloading, GetPost.data]);

  const handleNavi = (e) => {
    if (userId._id === idUser) {
      navigate(`/profile/${idUser}`);
    } else {
      navigate(`/other-people/${idUser}`);
    }
  };

  useEffect(() => {
    if (typeof data.user === "string") setUserReciver(data.user);
  }, [data.user]);

  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      postId: id,
      userInfo: userId,
      senderId: userId._id,
      post: data,
      reciverId: userReciver,
      type,
    });
  };

  return (
    <div className="post">
      <div className="info-img-post">
        <img src={imageProf ? imageProf : DefaultImg} alt="profile" />
        <p onClick={handleNavi} className="cursor">
          {namePost ? namePost : ""} {lastnamePost ? lastnamePost : ""}
        </p>
      </div>
      {data.image ? <img src={data.image} alt="img" /> : null}
      {data.video ? (
        <ReactPlayer
          className="videoPlay"
          playing={false}
          controls
          width="100%"
          height="100%"
          // title="My own video player"
          // video={data.video}
          // thumbnail="https://any-link.com/video-thumbnail.jpg"
          url={data.video}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      ) : null}

      <div className="detail">
        {data.desc && <span className="descrbtion"> {data.desc}</span>}
      </div>
      <div className="postReact">
        {liked ? (
          <img
            src={Heart}
            alt="heart"
            onClick={HandleLike}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <img
            src={NotLike}
            alt="not like"
            onClick={() => HandleLike(handleNotification(1))}
            style={{ cursor: "pointer" }}
          />
        )}

        <img
          src={Comment}
          alt="comment"
          className="Oncomment"
          onClick={ShowComment}
        />
        {isloading ? (
          <img
            src={Share}
            alt="share"
            onClick={HandleShare}
            className="cursor"
          />
        ) : (
          <CircularProgress className="spinner-loading" />
        )}
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      {showCo && (
        <div className="comment">
          <div className="container-comment">
            {comment.length > 0 ? (
              comment.map((item, indx) => (
                <div className="comment-name" key={indx}>
                  <img src={item.user.profilePicture} alt="img" />
                  <div className="testerr">
                    <ReadMore>{item.comment}</ReadMore>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                no comment here
              </p>
            )}
          </div>
          <div className="flex-comment">
            <textarea onChange={handleComment} ref={comInput}></textarea>
            <div>
              {saveComm && <SendIcon fontSize="large" onClick={sendComment} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
