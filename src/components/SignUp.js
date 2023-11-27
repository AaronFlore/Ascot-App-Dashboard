import React from "react";

const SignUp = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPass,
  handleSignUp,
  setSignUp,
  error,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="input-container">
          <input
            className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <label>First Name</label>
        </div>
        <div className="input-container">
          <input
            className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <label>Last Name</label>
        </div>
      </div>
      <div className="input-container">
        <input
          className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label>Email/User</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          onSubmit={handleSignUp}
          className="border border-t-0 border-l-0 border-r-0 text-black border-b-[#0F2B08] bg-[transparent] mb-4 p-2 focus:outline-none"
          placeholder="Password"
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
  );
};

export default SignUp;
