import React, { useEffect, useState } from "react";
import "./FollowersCard.css";

// import { Followers } from "../../data/FollowersData";
import UserFollow from "../userFollow/UserFollow";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser } from "../../reducers/user/GetAllUser";
import { Button } from "@mui/material";
import ModalFollowers from "./ModalFollowers";

function FollowersCard({ location }) {
  // block test
  // let arrrr = ["65be33df93d2b438e7b4ad9b"];

  const userId = JSON.parse(localStorage.getItem("user"));
  const user = userId ? userId : "";
  let dispatch = useDispatch();
  let [userData, setUserData] = useState([]);
  let [loading, setLoading] = useState(true);

  const [modalOpened, setModalOpened] = useState(false);

  const { AllUsers } = useSelector((state) => state.getAllUsers);
  const { follow } = useSelector((state) => state.followUser);
  const { unFollow } = useSelector((state) => state.UnfollowUser);
  useEffect(() => {
    let get = async () => {
      setLoading(true);
      await dispatch(GetAllUser());
      setLoading(false);
    };
    get();
  }, [dispatch, unFollow, follow]);
  useEffect(() => {
    if (!loading) {
      let getAllFlo = AllUsers.data.filter((e) => e._id !== user._id);
      // let getAllbloc = getAllFlo.filter((e) => arrrr.indexOf(e._id));

      setUserData(getAllFlo);
    }
  }, [AllUsers.data, loading, user._id]);

  return (
    <div className="followersCard">
      {!location ? <h3>People you may know</h3> : null}

      {!location
        ? userData
            .slice(0, 5)
            .map((followers, id) => (
              <UserFollow key={id} data={followers} id={followers._id} />
            ))
        : userData
            .slice(0)
            .map((followers, id) => (
              <UserFollow key={id} data={followers} id={followers._id} />
            ))}
      {!location ? (
        <Button
          className="btn-res"
          onClick={() => setModalOpened(true)}
          variant="outlined"
          size="small"
        >
          See more
        </Button>
      ) : (
        ""
      )}
      <ModalFollowers
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
}

export default FollowersCard;
