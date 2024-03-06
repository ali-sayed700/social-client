import { useRef, useState } from "react";
import { CreatePostApi } from "../../reducers/post/Upload.Posts";
import { useDispatch, useSelector } from "react-redux";

function CreatePostHook() {
  const userId = JSON.parse(localStorage.getItem("user"));
  const user = userId ? userId : "";
  const id = user._id;
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const imageRef = useRef();
  const VideoRef = useRef();
  const desc = useRef();
  // console.log(VideoRef.current.value);
  let dispatch = useDispatch();
  const onImageChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  const onVideoChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let video = e.target.files[0];

      setVideo(video);
    }
  };

  const { loading } = useSelector((state) => state.newPosts);

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (image !== "") {
      data.append("image", image);
    }
    if (video !== "") {
      data.append("video", video);
    }
    if (desc.current.value) {
      data.append("desc", desc.current.value);
    }
    await dispatch(CreatePostApi({ id, data }));

    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage("");
    setVideo("");
    desc.current.value = "";
    VideoRef.current.value = "";
    imageRef.current.value = "";
  };
  return [
    onImageChange,
    handleUpload,
    loading,
    imageRef,
    desc,
    image,
    setImage,
    user,
    VideoRef,
    setVideo,
    video,
    onVideoChange,
  ];
}

export default CreatePostHook;
