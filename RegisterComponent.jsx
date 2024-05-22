import React, { useState } from "react";
import { RegisterAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import { useNavigate } from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import { toast } from "react-toastify";
import { GoogleLogin } from 'react-google-login';
import firebase from 'firebase/compat/app'; // Update Firebase import statement
import 'firebase/compat/auth'; // Update Firebase auth import statement
import "../Sass/LoginComponent.scss";
import "../Sass/RegisterComponent.scss";

export default function RegisterComponent() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({});

    const register = async () => {
        try {
            let res = await RegisterAPI(credentials.email, credentials.password);
            toast.success("Account Created!");

            postUserData({
                userID: getUniqueID(),
                name: credentials.name,
                email: credentials.email,
                imageLink: generateInitialLetterImage(credentials.name.charAt(0).toUpperCase()),
            });

            navigate("/home");
            localStorage.setItem("userEmail", res.user.email);
        } catch (err) {
            console.log(err);
            toast.error("Cannot Create your Account");
        }
    };

    const generateInitialLetterImage = (letter) => {
        const backgroundColor = "black";
        const textColor = "white";
        const fontSize = 100;

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = fontSize * 2;
        canvas.height = fontSize * 2;
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = `${fontSize}px Arial`;
        context.fillStyle = textColor;
        context.textAlign = "center";
        context.textBaseline = "middle";

        context.fillText(letter, canvas.width / 2, canvas.height / 2);
        return canvas.toDataURL();
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
        <div className="login-wrapper">
            <img src={LinkedinLogo} className="linkedinLogo1" />
            <div className="box1">
                <div className="login-wrapper-inner">
                    <div className="auth-inputs">
                      <br />
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentials, name: event.target.value })
                            }
                            type="text"
                            className="common-input"
                            placeholder="Your Name"
                        />
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentials, email: event.target.value })
                            }
                            type="email"
                            className="common-input"
                            placeholder="Email or phone number"
                        />
                        <input
                            onChange={(event) =>
                                setCredentials({ ...credentials, password: event.target.value })
                            }
                            type="password"
                            className="common-input"
                            placeholder="Password (6 or more characters)"
                        />
                    </div>
                    <button onClick={register} className="login-btn">
                        Agree & Join
                    </button>
                    <hr className="hr-text" data-content="or" />
                    <div className="google-btn-container">
                    {/* <GoogleLogin
                            className="google-btn-container2"
                            clientId="862583049768-qck6gbjt5756rgaio81e59hls5uksqn5.apps.googleusercontent.com"
                            buttonText="Google (Not working right now)"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogleError}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                        <p className="go-to-signup">
                            <span className="join-now" onClick={() => navigate("/")}>
                                <a href=""><button className="google-btn-container2">Go To Sign in</button></a>
                            </span>
                            <a href=""><button className="google-btn-container2">Tweetbook</button></a>
                        </p>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
// import React, { useState } from "react";
// import { RegisterAPI } from "../api/AuthAPI";
// import { postUserData } from "../api/FirestoreAPI";
// import LinkedinLogo from "../assets/linkedinLogo.png";
// import { useNavigate } from "react-router-dom";
// import { getUniqueID } from "../helpers/getUniqueId";
// import { toast } from "react-toastify";
// import { GoogleLogin } from 'react-google-login';
// import firebase from 'firebase/compat/app'; // Update Firebase import statement
// import 'firebase/compat/auth'; // Update Firebase auth import statement
// import "../Sass/LoginComponent.scss";
// import "../Sass/RegisterComponent.scss";

// export default function RegisterComponent() {
//     let navigate = useNavigate();
//     const [credentials, setCredentials] = useState({});

//     const register = async () => {
//         try {
//             let res = await RegisterAPI(credentials.email, credentials.password);
//             toast.success("Account Created!");

//             postUserData({
//                 userID: getUniqueID(),
//                 name: credentials.name,
//                 email: credentials.email,
//                 imageLink: generateInitialLetterImage(credentials.name.charAt(0).toUpperCase()),
//             });

//             navigate("/home");
//             localStorage.setItem("userEmail", res.user.email);
//         } catch (err) {
//             console.log(err);
//             toast.error("Cannot Create your Account");
//         }
//     };

//     const generateInitialLetterImage = (letter) => {
//         const backgroundColor = "black";
//         const textColor = "white";
//         const fontSize = 100;

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = fontSize * 2;
//         canvas.height = fontSize * 2;
//         context.fillStyle = backgroundColor;
//         context.fillRect(0, 0, canvas.width, canvas.height);
//         context.font = `${fontSize}px Arial`;
//         context.fillStyle = textColor;
//         context.textAlign = "center";
//         context.textBaseline = "middle";

//         context.fillText(letter, canvas.width / 2, canvas.height / 2);
//         return canvas.toDataURL();
//     };

//     const responseGoogle = async (response) => {
//         const { profileObj, tokenId } = response;
//         const credential = firebase.auth.GoogleAuthProvider.credential(tokenId);
//         try {
//             const res = await firebase.auth().signInWithCredential(credential);
//             postUserData({
//                 userID: profileObj.googleId,
//                 name: profileObj.name,
//                 email: profileObj.email,
//                 imageLink: profileObj.imageUrl,
//             });

//             toast.success("Logged in with Google!");
//             navigate("/home");
//             localStorage.setItem("userEmail", profileObj.email);
//         } catch (err) {
//             toast.error("Google Sign-In failed");
//             console.error(err);
//         }
//     };

//     const responseGoogleError = (response) => {
//         toast.error("Google Sign-In failed");
//         console.error(response);
//     };

//     return (
//         <div className="login-wrapper">
//             <img src={LinkedinLogo} className="linkedinLogo1" />
//             <div className="box1">
//             <div className="left-side" >
//                 <div className="login-wrapper-inner">
//                     <div className="auth-inputs">
//                       <br />
//                       <br />
//                       <br />
//                         <input
//                             onChange={(event) =>
//                                 setCredentials({ ...credentials, name: event.target.value })
//                             }
//                             type="text"
//                             className="common-input"
//                             placeholder="Your Name"
//                         />
//                         <input
//                             onChange={(event) =>
//                                 setCredentials({ ...credentials, email: event.target.value })
//                             }
//                             type="email"
//                             className="common-input"
//                             placeholder="Email or phone number"
//                         />
//                         <input
//                             onChange={(event) =>
//                                 setCredentials({ ...credentials, password: event.target.value })
//                             }
//                             type="password"
//                             className="common-input"
//                             placeholder="Password (6 or more characters)"
//                         />
//                     </div>
//                     <button onClick={register} className="login-btn">
//                         Agree & Join
//                     </button>
//                     <hr className="hr-text" data-content="or" />
//                     <div className="google-btn-container">
//                     {/* <GoogleLogin
//                             className="google-btn-container2"
//                             clientId="862583049768-qck6gbjt5756rgaio81e59hls5uksqn5.apps.googleusercontent.com"
//                             buttonText="Sign in with Google"
//                             onSuccess={responseGoogle}
//                             onFailure={responseGoogleError}
//                             cookiePolicy={'single_host_origin'}
//                         /> */}
//                         <p className="go-to-signup">
//                             <span className="join-now" onClick={() => navigate("/")}>
//                                 <a href=""><button className="google-btn-container2">Go To Sign in</button></a>
//                             </span>
//                             <a href=""><button className="google-btn-container2">Tweetbook</button></a>
//                         </p>
//                         <br />
//                         <br />
//                     </div>
//                 </div>
                  
//   <div className="suggestions">
//     <div className="advertisement">
//     <button className="btn">Registration coming soon</button>
//   </div>
//   </div></div>
//             </div>
//         </div>
//     );
// }
