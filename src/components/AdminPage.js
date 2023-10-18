import React from "react";
import Dropdown from "react-dropdown";
import { auth } from "../firebaseConfig";

const AdminPage = () => {
  const options = ["Plant Tracking App"];
  const user = auth;

  return (
    <div className="bg-[#0E0E0E] h-screen w-screen relative grid grid-cols-8 gap-7">
      <div className="grid grid-rows-6 col-span-6 mt-10 ml-10 gap-8">
        <div className="w-full bg-[#D9D9D9] row-span-3 h-full rounded-[25px]"></div>
        <div className="w-full h-full row-span-2 rounded-[25px] grid grid-cols-6 gap-10">
          <div className="col-span-2 bg-[#D798E1] rounded-[25px]"></div>
          <div className="col-span-4 bg-[#4B4534] rounded-[25px]"></div>
        </div>
      </div>
      <div className="bg-[#FCFF64] col-span-2 my-10 mr-7 rounded-[25px] grid grid-rows-2">
        <div className="admin__user__logo flex justify-center items-center">
          <img
            src=""
            alt="User Profile Picture"
            className="user__logo__img hidden border-black border-2"
          />
          <div className="font-bold">
            Welcome {user.currentUser.displayName}!
          </div>
        </div>
        <div className="top-0 text-center w-full flex justify-center items-end mb-10">
          {/* <Dropdown
            controlClassName="bg-black h-[3.9vw] w-[19vw] flex justify-center items-center rounded-[20px] text-[#FCFF64] font-bold text-[1.7vw] font-inter"
            options={options}
            value={options[0]}
            placeholder={"Select an option"}
          /> */}
          <button className="bg-black h-[3.9vw] w-[19vw] flex justify-center items-center rounded-[20px] text-[#FCFF64] font-bold text-[1.7vw] font-inter">
            Download CSV
          </button>
          {/* <select>
            {options.map((value, index) => (
              <option className="text-[#FAFF11] font-bold" key={index}>
                {value}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
