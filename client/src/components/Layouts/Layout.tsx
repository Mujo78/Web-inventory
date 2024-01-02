import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="flex w-full font-Rubik">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
