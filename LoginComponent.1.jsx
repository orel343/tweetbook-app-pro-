import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to Tweetbook!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="login-wrapper" style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
      <div className="box">
        <div className="left-side">
          <img src={LinkedinLogo} className="linkedinLogo" />

          <div className="login-wrapper-inner">
            {/* <h1 className="heading">Sign in</h1> */}
            {/* <p className="sub-heading">Tweetbook</p> */}

            <div className="auth-inputs">
              <input
                onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                type="email"
                className="common-input"
                placeholder="Email or Phone" />
              <input
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                type="password"
                className="common-input"
                placeholder="Password" />
            </div>
            <button onClick={login} className="login-btn">
              Sign in
            </button>
          </div>
          <hr className="hr-text" data-content="or" />
          <div className="google-btn-container">
            <p className="go-to-signup">
              New to tweetbook?{" "}
              <span className="join-now" onClick={() => navigate("/register")}>
                Join now
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="right-side">
        {/* Add advertisements, buttons, or other content here */}
        <div className="advertisement">
          <h2>🎉social media</h2>
          <p>new application in the world!</p>
          <button className="btn">Registration coming soon</button>
        </div>

        <div className="suggestions">
          <h5>A few things that might interest you before...</h5>
          <ul>
            <li className="user-card">
              {/* <img src="profile1.jpg" alt="User" />
            <span>John Doe</span> */}
              <button className="add-friend-btn">reviews <div /></button>
            </li>
            <li className="user-card">
              {/* <img src="profile2.jpg" alt="User" />
            <span>Jane Smith</span> */}
              <button className="add-friend-btn">About Us</button>
            </li>
            <li className="user-card">
              {/* <img src="profile3.jpg" alt="User" />
            <span>Emily Johnson</span> */}
              <button className="add-friend-btn">news📰</button>
            </li>
          </ul>
        </div>

        <div className="trending-topics">
          <h2>Popular hits</h2>
          <ul>
            <li>#foryou</li>
            <li>#tweetbook</li>
            <li>#newsTheworld</li>
          </ul>
        </div>
      </div>


    </div>
  );
}
