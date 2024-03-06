import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GetOneUser } from "../../reducers/user/Get.SpecificUser";
function ProfileOtherCardHook(id) {
  // const user = JSON.parse(localStorage.getItem("user"));
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [userItem, setUserItem] = useState({});

  //   const { newIfU } = useSelector((state) => state.updateUserVal);
  const { GetSpUser } = useSelector((state) => state.getSpecificUser);
  const { follow } = useSelector((state) => state.followUser);
  const { unFollow } = useSelector((state) => state.UnfollowUser);
  useEffect(() => {
    let get = async () => {
      setLoading(true);
      await dispatch(GetOneUser(id));
      setLoading(false);
    };
    get();
  }, [dispatch, id, follow, unFollow]);

  useEffect(() => {
    if (!loading) {
      setUserItem(GetSpUser.data);
    }
  }, [GetSpUser.data, loading, unFollow, follow]);

  return [userItem];
}

export default ProfileOtherCardHook;
