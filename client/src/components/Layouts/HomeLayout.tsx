import React from "react";
import { Outlet } from "react-router-dom";
import DashSidebar from "../UI/DashSidebar";
import CustomNavbar from "../UI/CustomNavbar";

const HomeLayout: React.FC = () => {
  return (
    <div className="flex w-full">
      <div className="flex-shrink-0">
        <DashSidebar />
      </div>
      <div className="flex-grow h-screen flex-col justify-center">
        <CustomNavbar />
        <div className="flex-grow-1 py-3 px-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
