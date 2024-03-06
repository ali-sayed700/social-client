

// import { io } from "socket.io-client";


import  io from "socket.io-client";
const socket = io.connect("http://localhost:4000");
const Socket = () => {
    
return [socket]
 
}
 
export default Socket