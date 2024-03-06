import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetOneUser } from "../../reducers/user/Get.SpecificUser";
import DefaulImg from "../../img/User-avatar.svg.png";

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();

  // get oher users from _id from memebers chat
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    let get = async () => {
      let userData = await dispatch(GetOneUser(userId));

      setUserData(userData.payload.data);
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentUser]);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture ? userData?.profilePicture : DefaulImg
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
