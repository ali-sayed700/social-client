import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { LikesApi } from "../../reducers/post/Get.Likes";
import { GetAllFollwoing } from "../../reducers/user/GetAllFollowing";

function AddLikePostHook(data, user) {
  let dispatch = useDispatch();

  const [liked, setLiked] = useState(data.likes.includes(user && user._id));
  const [likes, setLikes] = useState(data.likes.length);
  let [namePost, setNamePost] = useState("");
  let [lastnamePost, setLastNamePost] = useState("");
  let [imageProf, setImageProf] = useState("");
  let [idUser, setIdUser] = useState("");

  const HandleLike = async () => {
    await dispatch(LikesApi(data._id));
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  useEffect(() => {
    // eslint-disable-next-line array-callback-return

    // console.log(user);
    // console.log(user._id);
    // console.log(data.user);
    if (user._id === data.user._id) {
      setNamePost(user.firstname);
      setLastNamePost(user.lastname);
      setImageProf(user.profilePicture);
      setIdUser(user._id);
    } else if (user.following.length >= 1) {
      user.following.forEach((e) => {
        setNamePost(e.firstname);
        setLastNamePost(e.lastname);
        setImageProf(e.profilePicture);
        setIdUser(e._id);
      });
    }
  }, [
    data.user,
    user,
    user._id,
    user.firstname,
    user.following,
    user.profilePicture,
  ]);
  useEffect(() => {
    let get = async () => {
      await dispatch(GetAllFollwoing());
    };
    get();
  }, [dispatch]);

  return [HandleLike, likes, liked, namePost, imageProf, idUser, lastnamePost];
}

export default AddLikePostHook;
