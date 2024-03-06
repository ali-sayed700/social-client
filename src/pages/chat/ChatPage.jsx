import React, { useEffect, useState } from "react";
// import LogoSearch from "../../components/logoSearch/LogoSearch";
import { UserChatsApi } from "../../reducers/chat/GetUserChat.Chat";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Conversation from "../../components/conversation/Conversation";
import "./Chat.css";
import NavIcons from "../../components/navIcon/NavIcons";
import ChatBox from "../../components/chatbox/ChatBox";
import Socket from "../socket/Socket";

import { useMediaQuery } from "@mui/material";

// import  {io}  from "socket.io-client";
// const socket = io.connect("http://localhost:8800");

function ChatPage() {
  const [socket] = Socket();
  const user = JSON.parse(localStorage.getItem("user"));

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [hideSection, setHideSection] = useState(false);
  const dispatch = useDispatch();
  // const socket = useRef();
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Get the chat in chat section

  const { userChat } = useSelector((state) => state.userschats);
  // console.log(userChat);
  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      await dispatch(UserChatsApi(user && user._id));
      setLoading(false);

      // const { data } = await UserChatsApi(user._id);
    };
    // setTimeout(() => {
    getChats();
    // }, 1200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setChats(userChat.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  // console.log(chats);

  // Connect to Socket.io
  useEffect(() => {
    // currIo = io("http://localhost:8800");
    //  socket.current = io("ws://localhost:4000");
    //  socket.emit("new-user-add", user._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    // Notification(socket.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      // socket?.emit("send-message", sendMessage);
      socket.emit("send-message", sendMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // let style = { gridTemplateColumns: currentChat && "auto" };
  // let style2 = { display: currentChat && "none" };
  // console.log(currentChat);

  const matches = useMediaQuery("(max-width:990px)");
  let hiddLeftSide = {};
  let hideRightSide = {};
  if (matches) {
    hiddLeftSide = {
      display: hideSection === false ? "flex" : "none",
    };
    hideRightSide = {
      display: hideSection === true ? "flex" : "none",
    };
  }

  return (
    <div className="Chat">
      {/* Left Side */}

      <div className="Left-side-chat" style={hiddLeftSide}>
        <div style={{ marginTop: "1rem" }}>
          <NavIcons />
        </div>
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats
              ? chats?.map((chat, index) => (
                  <div
                    onClick={() => {
                      setCurrentChat(chat);
                      setHideSection(true);
                    }}
                    key={index}
                  >
                    <Conversation
                      data={chat}
                      currentUser={user._id}
                      online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat" style={hideRightSide}>
        {/* <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div> */}
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          hideBoxChat={setHideSection}
        />
      </div>
    </div>
  );
}

export default ChatPage;
