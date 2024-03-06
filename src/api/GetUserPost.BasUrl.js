import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });
// const user = JSON.parse(localStorage.getItem("user"));

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }

  return req;
});

export const GetUserPosts = (id) => API.get(`/user/${id}/post`);
export const GetSpecificPosts = (id) => API.get(`/post/${id}`);
