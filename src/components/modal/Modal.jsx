import React from "react";

import ChatPage from "../../pages/chat/ChatPage";
import ProfileLeft from "../profileLeft/ProfileLeft";
import ProfileSide from "../profileSide/ProfileSide";
import RightSide from "../rightside/RightSide";
import "./Modal.css";
function ModalHook({
  isActiveLeft,
  isActiveRight,
  isActiveChat,
  isActiveProf,
}) {
  const style = { width: isActiveChat && "100%" };
  return (
    <>
      <div className="modalhook" style={style}>
        {isActiveLeft && <ProfileSide isShow={isActiveLeft} />}
        {isActiveRight && <RightSide isShow={isActiveRight} />}
        {isActiveChat && <ChatPage isShow={isActiveChat} style={style} />}
        {isActiveProf && <ProfileLeft isShow={isActiveProf} />}
      </div>
    </>
  );
}

export default ModalHook;
