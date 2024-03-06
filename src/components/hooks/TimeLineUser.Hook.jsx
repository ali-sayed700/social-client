import { useEffect, useState } from "react";
import { UserPostTimeLine } from "../../reducers/post/Get.UserPosts";
// import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

function TimeLineUserHook(id) {
  let [userPosts, setUserPosts] = useState([]);
  let [loading, setLoading] = useState(true);

  let dispatch = useDispatch();
  const { timeLineUsers } = useSelector((state) => state.timelineUser);
  // const user = JSON.parse(localStorage.getItem("user"));
  const { follow } = useSelector((state) => state.followUser);
  const { unFollow } = useSelector((state) => state.UnfollowUser);
  useEffect(() => {
    let get = async () => {
      setLoading(true);
      await dispatch(UserPostTimeLine(id));
      setLoading(false);
    };
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, follow, unFollow]);
  useEffect(() => {
    if (!loading) {
      setUserPosts(timeLineUsers.data);
    }
  }, [timeLineUsers.data, loading, follow, unFollow]);

  return [userPosts];
}

export default TimeLineUserHook;
