import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOneUser } from "../../reducers/user/Get.SpecificUser";

function GetSpecifcUserHook(id) {
  // let user = JSON.parse(localStorage.getItem("user"));
  let disptach = useDispatch();
  let [userSpicfic, setUserSpicic] = useState([]);

  const { GetSpUser } = useSelector((state) => state.getSpecificUser);
  useEffect(() => {
    let get = async () => {
      await disptach(GetOneUser(id));
    };
    get();
  }, [disptach, id]);

  useEffect(() => {
    if (GetSpUser.data) {
      setUserSpicic(GetSpUser.data);
    }
  }, [GetSpUser.data]);
  return [userSpicfic];
}

export default GetSpecifcUserHook;
