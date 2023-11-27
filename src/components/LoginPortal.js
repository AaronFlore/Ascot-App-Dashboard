import React, { useState } from "react";
import firebase from "firebase/compat/app"; // Importing from compat/app
import "firebase/compat/auth"; // Importing authentication module
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import methods to interact with Firestore
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginPortal = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setErrorMsg] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

      // Set user details in Firestore
      await setDoc(doc(db, "users", email), {
        firstName: firstName,
        lastName: lastName,
        admin: false, // Set default admin status
      });

      setSignUp(false);
      setEmail("");
      setPass("");
      setFirstName(""); // Clear the firstName state
      setLastName(""); // Clear the lastName state
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
      // Fetch user details from Firestore
      const userDoc = await getDoc(doc(db, "users", email));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
      } else {
        throw new Error("User details not found.");
      }

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
            <SignIn
              email={email}
              setEmail={setEmail}
              password={password}
              setPass={setPass}
              handleLogin={handleLogin}
              setSignUp={setSignUp}
              error={error}
            />
          ) : (
            <SignUp
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPass={setPass}
              handleSignUp={handleSignUp}
              setSignUp={setSignUp}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
