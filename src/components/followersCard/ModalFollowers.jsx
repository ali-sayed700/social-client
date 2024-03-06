import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import FollowersCard from "./FollowersCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #f1f1f1",
  boxShadow: 22,
  p: 4,
  borderRadius: 2,
};
// const styleTwo = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "40%",
//   bgcolor: "background.paper",
//   border: "2px solid #f1f1f1",
//   boxShadow: 22,
//   p: 4,
//   borderRadius: 2,
// };
function ModalFollowers({ modalOpened, setModalOpened }) {
  return (
    <div>
      <div>
        <Modal
          open={modalOpened}
          onClose={() => setModalOpened(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <FollowersCard location="modal" />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ModalFollowers;
