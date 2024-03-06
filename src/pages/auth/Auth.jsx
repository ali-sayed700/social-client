import React, { useEffect, useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { AuthApp } from "../../reducers/auth/AuthApp";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  let [iswork, setIsWorking] = useState(false);
  // const { loading } = useSelector((state) => state.loginUser);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      if (data.password === data.confirmpass) {
        setIsWorking(false);
        await dispatch(AuthApp({ dataApi: data, type: "signup" }));
        setIsWorking(true);
      } else {
        setConfirmPass(false);
      }
    } else {
      setIsWorking(false);
      await dispatch(AuthApp({ dataApi: data, type: "login" }));
      setIsWorking(true);
    }
  };
  const { login, loading } = useSelector((state) => state.loginUser);

  useEffect(() => {
    if (iswork) {
      if (login) {
        if (login.token) {
          localStorage.setItem("user", JSON.stringify(login.data));
          localStorage.setItem("token", JSON.stringify(login.token));

          navigate("/home");
          window.location.reload();
        }
      } else {
        localStorage.clear();
      }
    }
  }, [iswork, login, navigate]);

  return (
    <div className="auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1 style={{ backgroundColor: "red" }}>F-uture App</h1>
          <h6>exchange your topics with your friends</h6>
        </div>
      </div>
      {/* signup a-right */}
      <div className="a-right">
        <h1 style={{ textAlign: "center" }}>F-uture App</h1>
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3> {isSignUp ? "Sign up" : "Login "}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              required
              type="text"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="text"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="Submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
// function LogIn() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3>Log In</h3>

//         <div>
//           <input
//             type="text"
//             placeholder="Username"
//             className="infoInput"
//             name="username"
//           />
//         </div>

//         <div>
//           <input
//             type="password"
//             className="infoInput"
//             placeholder="Password"
//             name="password"
//           />
//         </div>

//         <div>
//           <span style={{ fontSize: "12px" }}>
//             Don't have an account Sign up
//           </span>
//           <button className="button infoButton">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// }

export default Auth;
