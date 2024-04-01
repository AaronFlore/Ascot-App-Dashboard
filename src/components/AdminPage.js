import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { auth, db } from "../firebaseConfig";
import { fetchDataAndDownload } from "../csvOutput.js";
import Image from "../images/user_icon.png";
import InvalidCredentials from "./InvalidCredentials.js";
import DataPreview from './DataPreview'; 
// import { projectsList } from "../projectsOutput.js";
// import fetchProjectData from "../projectsOutput.js";

const AdminPage = ({ user, setUser }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  //   const loadProjects = async (userProjects) => {
  //     try {
  //       await fetchProjectData(userProjects);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    if (!user || !user.projects) {
      console.log("User projects cannot be found!");
    } else {
      setProjectList(user.projects);
    }
  }, [user]);

  // const adminStatus = user && user.admin;
    const adminStatus = user;

  const name =
    user && user.firstName
      ? `${user.firstName} ${user.lastName}`
      : "Unknown User!";

  return adminStatus ? (
    <div className="bg-[#0E0E0E] h-screen w-screen relative grid grid-cols-8 gap-7">
      <div className="sign__out absolute">
        {/* <button
          className="border-2 bg-black border-white rounded-full p-2 my-2 mx-2"
          onClick={handleSignOut}
        >
          <p className="text-white font-bold">Sign Out</p>
        </button> */}
      </div>
      <div className="grid grid-rows-6 col-span-6 mt-10 ml-10 gap-8">
        <div className="w-full bg-[#D9D9D9] row-span-3 h-full rounded-[25px]">
          <p className="text-center w-full flex justify-center items-end font-bold">Data Preview</p>
          <DataPreview />
        </div>
        <div className="w-full h-full row-span-2 rounded-[25px] grid grid-cols-6 gap-10">
          <div className="col-span-2 bg-[#D798E1] rounded-[25px]">
            <div className="top-0 text-center w-full flex justify-center items-end mb-10 font-bold">
              Projects
            </div>
            {projectList?.map((project) => (
              <p>{project}</p> // Assuming each project has a 'name' property
            ))}
            {/* Will call a function to projectsOutput here to vertically list the projects under an admin account.  Use onLoad? */}
          </div>
          <div className="col-span-4 bg-[#4B4534] rounded-[25px]">
            <div className="top-0 text-center w-full flex justify-center items-end mb-10 font-bold">
              Users
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FCFF64] col-span-2 my-10 mr-7 rounded-[25px] grid grid-rows-2">
        <div className="admin__user__logo flex flex-col  my-10 items-center">
          <img
            src={Image}
            alt="User Profile Picture"
            className="user__logo__img w-[50%]"
          />
          <div className="font-bold">Welcome {name}!</div>
        </div>
        <div className="top-0 text-center w-full flex justify-center items-end mb-10">
          {/* <Dropdown
            controlClassName="bg-black h-[3.9vw] w-[19vw] flex justify-center items-center rounded-[20px] text-[#FCFF64] font-bold text-[1.7vw] font-inter"
            options={options}
            value={options[0]}
            placeholder={"Select an option"}
          /> */}
          <button
            className="bg-black h-[3.9vw] w-[19vw] flex justify-center items-center rounded-[20px] text-[#FCFF64] font-bold text-[1.7vw] font-inter"
            onClick={() => fetchDataAndDownload()}
          >
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
  ) : (
    <InvalidCredentials />
  );
};

export default AdminPage;
