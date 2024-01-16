import { Sidebar, Button, Avatar, CustomFlowbiteTheme } from "flowbite-react";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  authUser,
  logout,
  reset,
  resetSelected,
} from "../../features/auth/authSlice";
import { AiFillDashboard } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FcProcess } from "react-icons/fc";
import { FaFileContract, FaUsers } from "react-icons/fa";
import { MdBuild, MdLayers } from "react-icons/md";
import { IoMdSettings, IoIosHelpCircleOutline } from "react-icons/io";
import socket from "../../socket";

const customTheme: CustomFlowbiteTheme["sidebar"] = {
  root: {
    inner:
      "h-full overflow-y-auto overflow-x-hidden bg-green-500 py-0 px-0 dark:bg-gray-800",
  },
};

const DashSidebar: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { accessUser } = useSelector(authUser);

  const onLogOut = () => {
    socket.emit("logout", accessUser?.id);

    dispatch(logout());
    dispatch(reset());
    dispatch(resetSelected());
    navigate("/");
  };

  return (
    <div className="w-fit h-screen font-Rubik b-0">
      <Sidebar theme={customTheme}>
        <Sidebar.Items className="h-full border-r-2 p-0 border-r-green-500 flex flex-col justify">
          <Sidebar.ItemGroup className="pt-4 px-4 first:pt-5 py-0">
            <Sidebar.Item
              className="hover:!bg-green-500"
              as={NavLink}
              to="dashboard"
            >
              <Avatar
                alt="s"
                size="lg"
                rounded
                img="./assets/company_logo.jpg"
              />
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="flex p-3 flex-col justify-center">
            <Sidebar.Item
              as={NavLink}
              to="dashboard"
              active={location.pathname === "/dashboard"}
              icon={AiFillDashboard}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              to="products"
              active={
                location.pathname === "/products" ||
                location.pathname === "/add-product"
              }
              icon={MdLayers}
              className="mt-3"
            >
              Products
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              to="materials"
              active={
                location.pathname === "/materials" ||
                location.pathname === "/add-material" ||
                location.pathname.startsWith("/edit-material")
              }
              icon={MdBuild}
              className="mt-3"
            >
              Materials
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              active={
                location.pathname === "/processes" ||
                location.pathname === "/add-process"
              }
              to="processes"
              icon={FcProcess}
              className="mt-3"
            >
              Product process
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              active={
                location.pathname === "/suppliers" ||
                location.pathname === "/add-supplier"
              }
              to="suppliers"
              icon={FaFileContract}
              className="mt-3"
            >
              Suppliers
            </Sidebar.Item>
            {accessUser?.role === "Admin" && (
              <Sidebar.Item
                as={NavLink}
                active={location.pathname.includes("/employees")}
                to="employees"
                icon={FaUsers}
                className="mt-3 p-3"
              >
                Employee
              </Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="flex p-3 flex-col justify-between h-full">
            <Sidebar.ItemGroup>
              <Sidebar.Item
                as={NavLink}
                active={location.pathname === "/change-password"}
                to="change-password"
                icon={IoMdSettings}
              >
                Settings
              </Sidebar.Item>
              {accessUser?.role !== "Admin" && (
                <Sidebar.Item
                  as={NavLink}
                  active={
                    location.pathname === "/contact" ||
                    location.pathname === "/about"
                  }
                  to="contact"
                  icon={IoIosHelpCircleOutline}
                >
                  Help
                </Sidebar.Item>
              )}
            </Sidebar.ItemGroup>
            <Sidebar.Item className="hover:!bg-green-500">
              <Button className="w-full" color="success" onClick={onLogOut}>
                Log out
              </Button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default DashSidebar;
