import React, { useEffect, useRef, useState } from "react";
// import ReactWebMediaPlayer from "react-web-media-player";
import Comment from "../../../img/comment.png";
import Share from "../../../img/share.png";
import Heart from "../../../img/like.png";
import NotLike from "../../../img/notlike.png";
import { useDispatch, useSelector } from "react-redux";
// import { LikesApi } from "../../../reducers/post/Get.Likes";
import Socket from "../../../pages/socket/Socket";
import AddLikePostHook from "../../hooks/AddLikePost.Hook";
import { useNavigate } from "react-router-dom";
import { GetCommentApi } from "../../../reducers/comment/GetComments";
import { GetOnePostsApi } from "../../../reducers/post/Get.SpecificPost.Reducer";
import { CreatePostsApi } from "../../../reducers/post/Create.Post";
import { CreateCommentApi } from "../../../reducers/comment/CreateComment";
import ReadMore from "../../utiltity/ReadMore";
import SendIcon from "@mui/icons-material/Send";
import DefaultImg from "../../../img/User-avatar.svg.png";
import ReactPlayer from "react-player";

const UserPost = ({ data, id }) => {
  // let dispatch = useDispatch();
  // let user = JSON.parse(localStorage.getItem("user"));
  // const [liked, setLiked] = useState(data.likes.includes(user._id));
  // const [likes, setLikes] = useState(data.likes.length);
  // const HandleLike = async () => {
  //   await dispatch(LikesApi(data._id));
  //   setLiked((prev) => !prev);
  //   liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  // };

  const [socket] = Socket();

  const userId = JSON.parse(localStorage.getItem("user"));
  const [HandleLike, likes, liked, namePost, imageProf, idUser] =
    AddLikePostHook(data, userId);

  // console.log(user);
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
          navigate(`/home`);
        }
        get(sharePost);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isloading, GetPost.data]);
  const handleNavi = (e) => {
    navigate(`/other-people/${idUser}`);
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
          {namePost ? namePost : ""}
        </p>
      </div>
      {data.image ? <img src={data.image} alt="" /> : null}
      {data.video ? (
        <ReactPlayer
          className="videoPlay"
          width="100%"
          height="100%"
          url={data.video}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          controls
        />
      ) : null}
      <div className="detail">
        {/* <span><b>{data.name}</b></span> */}
        <span> {data.desc}</span>
      </div>

      <div className="postReact">
        {liked ? (
          <img
            src={Heart}
            alt=""
            onClick={HandleLike}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <img
            src={NotLike}
            alt=""
            onClick={() => HandleLike(handleNotification(1))}
            style={{ cursor: "pointer" }}
          />
        )}
        <img src={Comment} alt="" className="Oncomment" onClick={ShowComment} />
        <img src={Share} alt="" onClick={HandleShare} className="cursor" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      {showCo && (
        <div className="comment">
          <div className="container-comment">
            {comment
              ? comment.map((item, indx) => (
                  <div className="comment-name" key={indx}>
                    <img src={item.user.profilePicture} alt="" />
                    <div className="testerr">
                      <ReadMore>{item.comment}</ReadMore>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="flex-comment">
            <textarea id="" onChange={handleComment} ref={comInput}></textarea>
            <div>
              {saveComm && <SendIcon fontSize="large" onClick={sendComment} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPost;
