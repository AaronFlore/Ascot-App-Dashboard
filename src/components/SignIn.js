import React from "react";
import { Link } from "react-router-dom";

const SignIn = ({
  email,
  setEmail,
  password,
  setPass,
  handleLogin,
  setSignUp,
  error,
}) => {
  return (
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
      <div className="flex flex-row gap-5 mt-5">
        <Link
          to={"forgot"}
          className="text-[#777] text-[1.5vh] cursor-pointer mt-2"
        >
          Forgot?
        </Link>
        <div
          className="text-blue-500 text-[1.5vh] cursor-pointer mt-2"
          onClick={() => setSignUp(true)}
        >
          Sign Up
        </div>
      </div>
      <p className="text-red-500 mt-2 h-[1vh]">{error}</p>
    </>
  );
};

export default SignIn;
