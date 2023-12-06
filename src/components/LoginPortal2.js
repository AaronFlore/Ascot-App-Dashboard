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
import SignIn from "./SignIn copy";
import SignUp from "./SignUp copy";

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
      <div className="bg-[#0a2311] rounded-r-[5%]">
        <div className="grid grid-cols-10">
          <div className="col-span-1 text-white font-bold m-4 text[1vh]">
            ASCOT
          </div>
        </div>
      </div>
      <div className="sign__in__up bg-[#f1f1f1] flex flex-col justify-center items-left p-[10vh]">
        <div className="border-2 border-red-500 p-40">
          <header className="flex justify-left flex-col items-left mb-10">
            {!signUp ? (
              <>
                <p className="text-[3vh]">Hello! Welcome Back.</p>
                <p className="text-gray-500 text-[1.5vh]">
                  Log in with the data that you entered during your
                  registration.
                </p>
              </>
            ) : (
              <p className="text-[3vh]">Sign Up Below!</p>
            )}
          </header>
          <div className="">
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
      {/* <div className="bg-[black]">
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
          )} */}
    </div>
  );
};

export default LoginPortal;
