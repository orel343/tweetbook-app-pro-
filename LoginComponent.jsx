import React, { useState } from "react";
import { LoginAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI"; // Add this import for posting user data
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import "../Sass/Homescss.scss";
import { toast } from "react-toastify";
import { GoogleLogin } from 'react-google-login'; // Import GoogleLogin component
import firebase from 'firebase/compat/app'; // Import firebase
import 'firebase/compat/auth'; // Import firebase auth

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

   const responseGoogle = async (response) => {
     const { profileObj, tokenId } = response;
     const credential = firebase.auth.GoogleAuthProvider.credential(tokenId);
     try {
       const res = await firebase.auth().signInWithCredential(credential);
       postUserData({
         userID: profileObj.googleId,
         name: profileObj.name,
         email: profileObj.email,
         imageLink: profileObj.imageUrl,
       });

       toast.success("Logged in with Google!");
       navigate("/home");
       localStorage.setItem("userEmail", profileObj.email);
     } catch (err) {
       toast.error("Google Sign-In failed");
       console.error(err);
     }
   };

   const responseGoogleError = (response) => {
     toast.error("Google Sign-In failed");
     console.error(response);
   };

   return (
     <div className="login-wrapper" style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
       <div className="box">
         <div className="left-side">
           <div className="login-wrapper-inner">
             <div className="auth-inputs">
               <input
                 onChange={(event) =>
                   setCredentials({ ...credentials, email: event.target.value })
                 }
                 type="email"
                 className="common-input"
                 placeholder="Email or Phone"
               />
               <input
                 onChange={(event) =>
                   setCredentials({ ...credentials, password: event.target.value })
                 }
                 type="password"
                 className="common-input"
                 placeholder="Password"
               />
             </div>
             <button onClick={login} className="login-btn">
               Sign in
             </button>
           </div>
           <hr className="hr-text" data-content="or" />
           <div className="google-btn-container">
             {/* <GoogleLogin
               clientId="862583049768-qck6gbjt5756rgaio81e59hls5uksqn5.apps.googleusercontent.com"
               buttonText="Google (Not working right now)"
               onSuccess={responseGoogle}
               onFailure={responseGoogleError}
               cookiePolicy={'single_host_origin'}
             /> */}
             <p className="go-to-signup">
               New to Tweetbook?{" "}
               <span className="join-now" onClick={() => navigate("/register")}>
                 Join now
               </span>
             </p>
           </div>
         </div>
       </div>

       <div className="right-side">
         <div className="suggestions">
           <h5>A few things that might interest you before...</h5>
           <div className="advertisement">
             <button className="btn">Registration coming soon</button>
           </div>
         </div>
       </div>
     </div>
   );
}
