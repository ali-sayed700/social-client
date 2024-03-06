// import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UpdateUser } from "../../reducers/user/UpdateUserInfo";

function UpdateUserInfoHook(data, setModalOpened) {
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImg"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    console.log(UserData);
    const formatDat = new FormData();
    if (profileImage) {
      formatDat.append("profilePicture", profileImage);
    }
    if (coverImage) {
      formatDat.append("coverPicture", coverImage);
    }

    formatDat.append("firstname", UserData.firstname || data.firstname);
    formatDat.append("lastname", UserData.lastname || data.lastname);

    formatDat.append("livesin", UserData.livesin || "");

    formatDat.append("worksAt", UserData.worksAt || "");

    formatDat.append("country", UserData.country || "");

    formatDat.append("relationship", UserData.relationship || "");

    await dispatch(UpdateUser({ id, formatDat }));
    setModalOpened(false);
  };
  return [handleChange, onImageChange, handleSubmit, formData];
}

export default UpdateUserInfoHook;
