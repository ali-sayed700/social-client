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

export const UpFollowers = (id) => API.put(`/follow-people/${id}/follow`);
export const RemFollowers = (id) => API.put(`/follow-people/${id}/unfollow`);
