import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token"))
    }`;
  }

  return req;
});

export const getTimelinePosts = () => API.get(`/post/timeline`);
export const LikePosts = (id) => API.put(`/post/${id}/likes`);
