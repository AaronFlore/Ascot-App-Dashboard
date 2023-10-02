import React, { useState } from "react";
import firebase from "firebase/compat/app"; // Importing from compat/app
import "firebase/compat/auth"; // Importing authentication module
import { auth } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginPortal = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setErrorMsg] = useState("");
  const [signUp, setSignUp] = useState(false);

  const handleSignUp = () => {
    try {
      if (!isValidPassword(password)) {
        setErrorMsg("Password must be 8-12 characters with a number");
        setTimeout(() => {
          setErrorMsg("");
        }, 1000);
        return;
      } else if (!isValidEmail(email)) {
        setErrorMsg("Email must be a valid email address");
        setTimeout(() => {
          setErrorMsg("");
        }, 1000);
        return;
      }
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const currentUser = userCredential.user;
          // Set user with displayName property if available
          setUser({
            displayName: currentUser.displayName || "", // Use an empty string if displayName is not available
          });
        }
      );
      setSignUp(false);
      setEmail("");
      setPass("");
    } catch (error) {
      console.error("Error", error.message);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const currentUser = userCredential.user;
          // Set user with displayName property if available
          setUser({
            displayName: currentUser.displayName || "", // Use an empty string if displayName is not available
          });
        }
      );
      console.log(user);
      console.log("Success!");
    } catch (error) {
      const errorMessage = "Invalid credentials were used";
      setErrorMsg(errorMessage);
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
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
                onClick={handleLogin}
                className="bg-[#0F2B08] text-white py-2 px-4 rounded"
              >
                Submit
              </button>
              <div
                className="text-blue-500 cursor-pointer mt-2"
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </div>
              <p className="text-red-500 mt-2">{error}</p>
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
              <p className="text-red-500 mt-2">{error}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
