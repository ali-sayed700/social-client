import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }

  return req;
});

export const UpdateUserApi = ( {id, formatDat} ) => API.put(`/user/${id}`, formatDat);
export const GetSpecificUser = (id) => API.get(`/user/${id}`);
// get all user
export const AllUser = () => API.get(`/user`);

// follow
export const UserFollowing = () => API.get(`/follow-people/following`);
