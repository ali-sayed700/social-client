import React from "react";

import { useEffect, useState } from "react";
import { useRef } from "react";
// import { addMessage, getMessages } from "../../api/MessageRequests";
// import { getUser } from "../../api/UserRequests";
import "./ChatBox.css";
// import { format, render, cancel, register } from "timeago.js";
// import TimeAgo from "timeago-react";
import InputEmoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GetOneUser } from "../../reducers/user/Get.SpecificUser";
// import { userMessage } from "../../api/GetUserMessage.BaseUrl";
import { UserMessageApi } from "../../reducers/message/GetUserMessage.Chat";
import DefaulImg from "../../img/User-avatar.svg.png";
import { CreateMessageApi } from "../../reducers/message/CreateUserMessage.Chat";
// import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
// import { UilArrowLeft } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
// import ReactWebMediaPlayer from "react-web-media-player";
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMediaQuery } from "@mui/material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ReactPlayer from "react-player";

// import { display } from "@mui/system";/
const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  hideBoxChat,
}) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newFile, setNewFile] = useState([]);
  const [dataImg, setDataImg] = useState([]);
  const [dataVideo, setDataVideo] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (nMessage) => {
    setNewMessage(nMessage);
  };

  const onHandleFiles = (allFiles) => {
    let arrTest = [...newFile, ...allFiles.target.files];

    if (allFiles.target.files) {
      let arr = [];

      arrTest.forEach((img, i) => {
        arr.push(img);
      });

      setNewFile(arr);
    }
  };

  useEffect(() => {
    if (newFile.length > 0) {
      let arrImg = [];
      let arrVideo = [];
      let arrData = [];
      newFile.forEach((datafile) => {
        if (datafile.type.startsWith("image")) {
          arrImg.push(datafile);
        } else if (datafile.type.startsWith("video")) {
          arrVideo.push(datafile);
        } else {
          arrData.push(datafile);
        }
      });

      setDataImg(arrImg);
      setDataVideo(arrVideo);
    }
  }, [newFile]);

  const onRemoveFile = (e) => {
    const newDataImg = dataImg.filter((col) => {
      return col !== e;
    });
    setDataImg(newDataImg);

    if (newDataImg.length === 0) {
      dataRef.current.value = "";
      setDataImg("");
      setNewFile("");
    }
  };

  const onRemoveVideo = (e) => {
    const newDataVid = dataVideo.filter((col) => {
      return col !== e;
    });
    setDataVideo(newDataVid);

    if (newDataVid.length === 0) {
      dataRef.current.value = "";
      setDataVideo("");
      setNewFile("");
    }
  };
  // fetching data for header
  const { GetSpUser } = useSelector((state) => state.getSpecificUser);
  useEffect(() => {
    if (chat !== null) {
      let userId = chat.members.find((id) => id !== currentUser);

      let getUserData = async () => {
        setLoading(true);

        await dispatch(GetOneUser(userId));
        setLoading(false);
      };
      getUserData();
    }
  }, [chat, currentUser, dispatch]);

  useEffect(() => {
    if (!loading) {
      if (GetSpUser.data) {
        setUserData(GetSpUser.data);
      }
    }
  }, [GetSpUser.data, loading]);
  //   // fetch messages
  const { userMsg } = useSelector((state) => state.usersMessage);

  useEffect(() => {
    // if (chat)
    let fetchMessages = async () => {
      //   console.log(chat);
      setIsLoading(true);
      await dispatch(UserMessageApi(chat._id));

      setIsLoading(false);
    };

    if (chat !== null) fetchMessages();
  }, [chat, dispatch]);

  useEffect(() => {
    if (!isloading) {
      setMessages([...userMsg.data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isloading]);

  useEffect(() => {
    return scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //   // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    let chatId = chat._id;
    let senderId = currentUser;

    const formData = new FormData();

    formData.append("chatId", chatId);
    formData.append("senderId", senderId);
    if (newMessage) {
      formData.append("text", newMessage);
    }
    if (dataImg) {
      dataImg.map((e) => {
        return formData.append("image", e);
      });
    }

    if (dataVideo) {
      dataVideo.map((e) => {
        return formData.append("video", e);
      });
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    //     // send message to socket server
    // setSendMessage({ senderId, chatId, text, receiverId });

    //     // send message to database

    const createData = await dispatch(CreateMessageApi(formData));

    setSendMessage({ ...createData.payload.data, receiverId });

    setMessages([...messages, createData.payload.data]);
    setNewMessage("");
    setDataVideo("");
    setNewFile("");
    setDataImg("");
  };

  // Receive Message from parent component
  useEffect(() => {
    // console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
    // console.log(receivedMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessage]);

  const scroll = useRef();
  const dataRef = useRef();

  let style = {
    marginLeft: "auto",
    width: "6%",
    backgroundSize: "contain",
    cursor: "pointer",
  };
  const GetTime = (data) => {
    const currTime = ` ${moment(data).fromNow()} `;
    const outputTime = ` ${moment(data).calendar()} `;

    if (outputTime.trim().startsWith("T")) {
      return currTime;
    } else {
      return outputTime;
    }
  };
  const matches = useMediaQuery("(max-width:990px)");
  let hiddBx = {};
  if (matches) {
    hiddBx = {
      display: chat ? "grid" : "none",
    };
  }
  return (
    <>
      <div className="ChatBox-container" style={hiddBx}>
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <ArrowBackIcon style={style} onClick={() => hideBoxChat(false)} />
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? userData?.profilePicture
                        : DefaulImg
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages
                ? messages.map((msg, index) => (
                    <div
                      key={index}
                      ref={scroll}
                      className={
                        msg.senderId === currentUser ? "message own" : "message"
                      }
                    >
                      {msg.text && <span>{msg.text}</span>}
                      {msg.image.length > 0 ? (
                        <div className="chatImg">
                          <PhotoProvider>
                            {msg.image
                              ? msg.image.map((image) => (
                                  <PhotoView src={image} key={Math.random()}>
                                    <img
                                      src={image}
                                      alt=""
                                      key={Math.random()}
                                    />
                                  </PhotoView>
                                ))
                              : null}
                          </PhotoProvider>
                        </div>
                      ) : null}
                      {msg.video.length > 0 && (
                        <div className="chatImg">
                          {msg.video
                            ? msg.video.map((vid, indx) => (
                                <ReactPlayer
                                  controls
                                  // className="videoPlay"
                                  width="100%"
                                  height="100%"
                                  title={vid.name}
                                  config={{
                                    file: {
                                      attributes: {
                                        controlsList: "nodownload",
                                      },
                                    },
                                  }}
                                  url={vid}
                                  // thumbnail="https://any-link.com/video-thumbnail.jpg"
                                  key={indx}
                                />
                              ))
                            : null}
                        </div>
                      )}
                      <span>{GetTime(msg.createdAt)}</span>
                    </div>
                  ))
                : null}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => dataRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                placeholder="Type a message"
                cleanOnEnter
              />
              {newMessage || dataImg.length > 0 || dataVideo.length > 0 ? (
                <div className="send-button button" onClick={handleSend}>
                  Send
                </div>
              ) : null}
              <input
                type="file"
                multiple
                name=""
                id=""
                style={{ display: "none" }}
                ref={dataRef}
                onChange={onHandleFiles}
              />
            </div>

            {dataImg.length > 0 && (
              <div className="previewImageChat">
                {dataImg.map((e, i) => (
                  <div className="editimg" key={i} id={i}>
                    <UilTimes onClick={() => onRemoveFile(e)} />
                    <img src={URL.createObjectURL(e)} alt="preview" />
                  </div>
                ))}
              </div>
            )}

            {dataVideo.length > 0 && (
              <div className="previewvideoChat">
                {dataVideo.map((e, i) => (
                  <div className="editimg" key={i} id={i}>
                    <UilTimes onClick={() => onRemoveVideo(e)} />
                    <ReactPlayer
                      width="200"
                      height="200"
                      controls
                      url={URL.createObjectURL(e)}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;

// {
//   dataFiles ? (dataFiles.map((e) => {
//        console.log(e);
//   })) : null
// }
