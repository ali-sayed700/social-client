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

export const userChats = (id) => API.get(`/chat/${id}`);

export const userCreateChats = (data) => API.post(`/chat`,data);
export const getSpecificChat = (sender,reciver) => API.get(`/chat/find/${sender}/${reciver}`);
export const deleteChat = (id) => API.delete(`/chat/${id}`);
