
import Modal from "@mui/material/Modal";
import PostShare from "../postShare/PostShare";
import "./ShareModel.css";
import React from "react";
function ShareModal({ modalOpened, setModalOpened }) {
  return (
    <Modal
      className="modal postModel"
      keepMounted
      open={modalOpened}
      onClose={() => setModalOpened(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description">
      <div>
        <PostShare />
      </div>
    </Modal>
  );
}

export default ShareModal;
