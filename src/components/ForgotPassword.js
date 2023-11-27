// components/ForgotPassword.js
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-white w-screen h-screen grid grid-cols-2">
      <div className="reset__side_panel bg-[#0F2B08] w-[40vh] h-screen p-[4vh]">
        <Link
          to="/"
          className="text-white font-bold font-inter text-[2vh] border-2 border-white p-3 rounded-full"
        >
          Back
        </Link>
      </div>
      <div className="flex justfy-center items-center">
        <div className="forgot__pass_form">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold font-inter text-[3vh]">
              Forgot Password?
            </h1>
            <p>
              Enter the email used when you joined and we'll
              <br /> send you instructions to reset your password.
            </p>
            <p className="mb-5">
              For security reasons, we do NOT store your password. So rest
              <br />
              assured that we will never send your password via email.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label
              className="block text-gray-800 font-bold text-[2vh]"
              for="email"
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block border-2 h-[5vh] border-[#232382d9] px-2 w-[40vh] focus:outline-none mb-[4vh]"
            />
            <button
              type="submit"
              className="rounded-md w-[20vh] h-[5vh] bg-[#232382d9] text-white font-bold"
            >
              Reset Password
            </button>
          </form>
          {message && <p className="text-green-800 mt-[5vh]">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
