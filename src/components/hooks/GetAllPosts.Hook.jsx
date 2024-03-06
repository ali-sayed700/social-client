import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { TimeLine } from "../../reducers/post/Get.TimeLine";

function GetAllPostsHook() {
  const user = JSON.parse(localStorage.getItem("user"));

  let [loading, setLoading] = useState(true);
  let [postData, setPostData] = useState([]);
  let dispatch = useDispatch();
  const { createPost } = useSelector((state) => state.newPosts);
  const { getTimeLine } = useSelector((state) => state.GetTimeLines);
  const { newIfU } = useSelector((state) => state.updateUserVal);
  const { follow } = useSelector((state) => state.followUser);
  const { unFollow } = useSelector((state) => state.UnfollowUser);
  const { BuildPost } = useSelector((state) => state.CreateShare);

  useEffect(() => {
    let get = async () => {
      setLoading(true);
      await dispatch(TimeLine());
      setLoading(false);
    };

    get();
  }, [dispatch, createPost, follow, unFollow, BuildPost]);

  useEffect(() => {
    if (!loading) {
      if (Array.isArray(getTimeLine.data)) {
        setPostData(getTimeLine.data);
      }
    }
  }, [getTimeLine.data, loading, newIfU, follow, unFollow, BuildPost]);

  // console.log(postData);
  return [postData, user];
}

export default GetAllPostsHook;
