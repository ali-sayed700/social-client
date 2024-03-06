import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { UpdateFollower } from "../../reducers/user/UpdateFollowers";
import { UpdateUnFollower } from "../../reducers/user/UpdateUnFollowers";
import { Link } from "react-router-dom";
import { CreateChatsApi } from "../../reducers/chat/CreateUserChat";
import { getSpecificChatApi } from "../../reducers/chat/getSpecificChat";
import { DeleteChatsApi } from "../../reducers/chat/DeleteChat";

function UserFollow({ data, id }) {
  const { follow } = useSelector((state) => state.followUser);
  const { unFollow } = useSelector((state) => state.UnfollowUser);
  const { GetOneChat } = useSelector((state) => state.GetSpecificChat);

  const user = JSON.parse(localStorage.getItem("user"));
  let dispatch = useDispatch();
  const [userFollow, setUserFollow] = useState(
    data.followers.includes(user._id)
  );
  const [userFol, setUserFol] = useState(data.following.includes(user._id));

  useEffect(() => {
    const senderId = user._id;
    const receiverId = id;

    // // if(loading === true)
    if (userFollow) dispatch(getSpecificChatApi({ senderId, receiverId }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userFollow]);

  const handleFollow = async () => {
    const senderId = user._id;
    const receiverId = id;

    if (userFollow) {
      await dispatch(UpdateUnFollower(data._id));
    } else {
      await dispatch(UpdateFollower(data._id));
    }
    // if (GetOneChat.data) {
    //   console.log(GetOneChat.data.members);
    // }

    const get = async () => {
      console.log(GetOneChat);

      if (!userFollow && !userFol) {
        await dispatch(CreateChatsApi({ senderId, receiverId }));
      }

      // if () {
      // await dispatch(CreateChatsApi({ senderId, receiverId }));
      // }
      // !userFollow && (await dispatch(CreateChatsApi({ senderId, receiverId })));

      if (GetOneChat) {
        userFollow && (await dispatch(DeleteChatsApi(GetOneChat.data._id)));
      }
    };

    get();
    setUserFollow((prev) => !prev);
    setUserFol((prev) => !prev);
  };

  useEffect(() => {
    setUserFollow(data.followers.includes(user._id));
  }, [data.followers, follow, id, unFollow, user._id, user.following]);
  // console.log(id);

  return (
    <div className="follower" id={id}>
      <div>
        <img
          src={data.profilePicture ? data.profilePicture : null}
          alt=""
          className="followerImage"
        />
        <Link
          to={`/other-people/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="name">
            <span>{data.firstname}</span>
            <span>@{data.username}</span>
          </div>
        </Link>
      </div>
      <button
        className={
          userFollow ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {userFollow ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
}

export default UserFollow;
