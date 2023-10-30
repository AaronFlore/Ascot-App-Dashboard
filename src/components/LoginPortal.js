import React, { useState } from "react";
import firebase from "firebase/compat/app"; // Importing from compat/app
import "firebase/compat/auth"; // Importing authentication module
import { auth } from "../firebaseConfig";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginPortal = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setErrorMsg] = useState("");
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!isValidPassword(password)) {
        throw Error("Password must be valid (8-12 char. with 1 number)");
      } else if (!isValidEmail(email)) {
        throw Error("Email must be a valid email address");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      setUser({ displayName: currentUser.displayName || "" });

      setSignUp(false);
      setEmail("");
      setPass("");
    } catch (error) {
      setErrorMsg(error.message);
      setTimeout(() => setErrorMsg(""), 1000);
    }
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    return regex.test(password);
  };

  const isValidEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  const mapAuthCodeToMessage = (authCode) => {
    switch (authCode) {
      case "auth/invalid-password":
        return "Password provided is not corrected";

      case "auth/invalid-email":
        return "Email provided is invalid";

      default:
        return "Invalid Credentials";
    }
  };

  const handleLogin = async () => {
    try {
      if (!isValidEmail(email)) {
        throw Error("Email must be a valid email address");
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;
      setUser({ displayName: currentUser.displayName || "" });

      // If persistence is required, you can add it here
    } catch (error) {
      setErrorMsg(mapAuthCodeToMessage(error.code));
      setTimeout(() => setErrorMsg(""), 1000);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="h-screen w-screen grid grid-cols-2">
      <div className="bg-[#0F2B08]">
        <div className="h-full flex items-center justify-end">
          <div className="flex h-[70%] w-[80vh] border-[#5C4646] border-2 border-r-0">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-[#D8FF84] text-center opacity-100 font-bold text-[3.5vw] font-inter">
                Admin Portal
                <br />
                Ascot App
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full flex items-center justify-start bg-[#D9D9D9]">
        <div className="h-[70%] w-[80vh] flex flex-col bg-[#F5F6FA] border-2 border-[#F5F6FA] border-l-0 p-8 items-center justify-center">
          {!signUp ? (
            <>
              <div className="input-container relative">
                <input
                  className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email/User</label>
              </div>
              <div className="input-container relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  onSubmit={handleLogin}
                  className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
                />
                <label>Password</label>
              </div>
              <div className="grid grid-cols-1">
                {" "}
                {/* FIXME: change to include pill for checkbox (grid-cols-2 and uncomment the below) */}
                {/* <div className="w-[30%] mb-[1vh] scale-100 flex items-center justify-center">
                  <div className="item h-full flex items-center justify-center">
                    <div class="toggle-pill-color">
                      <input type="checkbox" id="pill3" name="check" />
                      <label htmlFor="pill3"></label>
                    </div>
                  </div>
                </div> */}
                <button
                  title="submit"
                  onClick={handleLogin}
                  className="bg-[#0F2B08] text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
              <div
                className="text-blue-500 cursor-pointer mt-2"
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </div>
              <p className="text-red-500 mt-2 h-[1vh]">{error}</p>
            </>
          ) : (
            <>
              <div className="input-container">
                <input
                  className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email/User</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  onSubmit={handleLogin}
                  className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
                />
                <label>Password</label>
              </div>
              <button
                title="submit"
                onClick={handleSignUp}
                className="bg-[#0F2B08] text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
              <p
                className="text-blue-500 cursor-pointer mt-2"
                onClick={() => setSignUp(false)}
              >
                ← Back
              </p>
              <p className="text-red-500 mt-2 h-[1vh]">{error}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
