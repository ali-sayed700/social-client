
import React from "react";

import Noti from "../../../img/noti.png";

import "./Notification.css"
import Socket from "../../../pages/socket/Socket";
import { useEffect, useState } from "react";

import DefaultImg from "../../../img/User-avatar.svg.png";
const Notification = () => {

  
  const [socket] = Socket()
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    socket.on("getNotification", (data) => {
      // console.log(notifications);
      setNotifications((prev) => [...prev, data]);
      
      // eslint-disable-next-line array-callback-return
  })
  }, [ socket]);
  
const imgSty = {
    width: "1.5rem",
    height: "1.5rem",
    cursor:"pointer",
    color:"hover:red"

}

const style = {
  // position: "absolute",
  // top: "4px",
  // right: "31px",
  // background: "var(--orange)",
  // padding: "8px",
  // borderRadius: "50%",
  // width: ".3rem",
  // height: ".3rem",
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  color: notifications.length > 0 ? "red" :"black",
  fontSize: "18px",
  fontWeight: "bold",
}

// const [item, setItem] = useState([]);
// const [storeBol, setStoreBol] = useState(false);
// const [count, setCount] = useState(0);
// const reCount = useRef(0)

// useEffect(() => {
//   socket.on("getNotification", (data) => {
//     // console.log(notifications);
//     setNotifications((prev) => [...prev, data]);
    
//     // eslint-disable-next-line array-callback-return
// })
// }, [ socket]);


useEffect(() => {
  // eslint-disable-next-line array-callback-return
  notifications.map((val) =>  {
 
  //  console.log(val);
    // setStoreBol(val)
    // console.log(val);
    // if (val.liked === true) {
    //   console.log("true");
    // }
    // if (val.liked === false  || val.type === 2 || val.type === 3) {
    //   // console.log(notifications.length);
    //   setCount(res => res + 1)
    //   setStoreBol(true);
    // } else {
    //   setStoreBol(false);

    // }
//  console.log(val);
 
  })
  
  
},[notifications ])


const handleRead = () => {
  setNotifications([]);
  setOpen(false);
};



const DisplayNotification = ({  postId ,userInfo, senderId,post ,reciverId ,type  } ,indx) =>{

// console.log(userFollowing);
  let action;

    if (type === 1) {

      action = "liked";
    
    }
  
     else if (type === 2) {
      action = "commented";
   

    } else if (type === 3) {
      // eslint-disable-next-line no-unused-vars
      action = "shared";
     

    }
    return (
     
       

        <div key={indx} className="notification">
            <img src={userInfo.profilePicture ?  userInfo.profilePicture : DefaultImg} alt="" />

              <p> {`${userInfo.firstname } ${userInfo.lastname } ${action} your post`} </p>



        </div>

        )
}


  return (
    <div  className="noti">
    <div>
        <img style={imgSty} src={Noti} alt="test" onClick={() => setOpen(!open)} />

    </div>
   
      <div style={style} >{  notifications.length}</div>    
      {/* <div style={style} >{count}</div>     */}

  
    


     {open  && (




<div className="notifications">

          { notifications.map((n ,indx) =>  DisplayNotification(n ,indx))}

          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>  
)} 

    </div>

  )
}

export default Notification





// <div>
 
// <img style={imgSty} src={Noti} alt="" onClick={() => setOpen(!open)} />
// <div >
// {
// notifications.length >0 &&
//             <span className="style">{notifications.length}</span>
//           }
// </div>
//  {open  && (


//   /* //  { notifications ? (notifications.map((n) => console.log(n))) : <p>no notification</p>}  */

// <div className="notifications">
// {notifications.map((n) => displayNotification(n))}

//           <button className="nButton" onClick={handleRead}>
//             Mark as read
//           </button>
//         </div>  
// )} 
   
//  </div>