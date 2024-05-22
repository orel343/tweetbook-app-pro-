import React, { useState } from "react";

export default function LoginComponent() {
   const [showSquare, setShowSquare] = useState(false);

   const handleButtonClick = () => {
      setShowSquare(true);
   };

   const handleSendClick = () => {
      // Logic to handle sending email
      alert("Email sent!");
   };

   return (
      <div className="login-wrapper" style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
         <div className="box">
            <div className="left-side">
               <img src={LinkedinLogo} className="linkedinLogo" />
               <div className="login-wrapper-inner">
                  <button onClick={handleButtonClick} className="btn">Soon - for registration</button>
                  <hr className="hr-text" data-content="or" />
                  <div className="google-btn-container">
                     <p className="go-to-signup">New to tweetbook? <span className="join-now">Join now</span></p>
                  </div>
               </div>
            </div>
         </div>
         {/* Square */}
         {showSquare && (
            <div className="square">
               <h2>Enter your email</h2>
               <input type="email" placeholder="Your email" />
               <button onClick={handleSendClick}>Send</button>
            </div>
         )}
         {/* Right side content */}
         <div className="right-side">
            {/* Add advertisements, buttons, or other content here */}
            <div className="advertisement">
               <h2>tweetbook</h2>
               <p>We will be back very soon</p>
            </div>
         </div>
      </div>
   );
}
