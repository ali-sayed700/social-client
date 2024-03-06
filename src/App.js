
import "./App.css";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import ShowOthers from "./components/showOtherFollowers/ShowOthers";
import ChatPage from "./pages/chat/ChatPage";
import Socket from "./pages/socket/Socket";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

// import  io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");

function App() {
  if(localStorage.getItem("user") === "undefined") {
    <Navigate to="../auth" />;
    localStorage.clear()
  }

  const token = JSON.parse(localStorage.getItem("token"));
  let user = JSON.parse(localStorage.getItem("user"))
  const { userChat } = useSelector((state) => state.userschats);
  const { likesList } = useSelector((state) => state.likesClick);
  const [socket] = Socket()


  try {
    useEffect(() => {
      if (user._id)
        socket.emit("new-user-add", user._id);


    }, [socket, user._id, userChat.data, likesList])

  } catch (error) {
    <Navigate to="../auth" />;
    localStorage.clear()


  }





  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="App">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>


        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Navigate to="/auth" />}
          />
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/auth" />}
          />
   
          <Route
            path="/auth"
            element={token ? <Navigate to="/home" /> : <Auth />}
          />
          <Route
            path="/profile/:id"
            element={token ? <Profile /> : <Navigate to="/auth" />}
          />

          <Route
            path="/other-people/:id"
            element={token ? <ShowOthers /> : <Navigate to="/auth" />}
          />
          <Route
            path="/chat"
            element={token ? <ChatPage /> : <Navigate to="/auth" />}
          />


        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
