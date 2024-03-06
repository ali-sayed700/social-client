import axios from "axios";

const API = axios.create(
  { baseURL: "http://localhost:8000" ,

}

);


API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }

  return req;
});

export const CreatePost = ({ id, data }) => API.post(`/user/${id}/post`, data);
export const CreateOnePost = (data) => API.post(`/post`, data);
