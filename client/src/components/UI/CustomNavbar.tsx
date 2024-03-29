import React, { useEffect } from "react";
import { Avatar } from "flowbite-react";
import { useSelector } from "react-redux";
import { authUser } from "../../features/auth/authSlice";
import { LuMessageSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import socket from "../../socket";

const CustomNavbar: React.FC = () => {
  const date = new Date().toDateString();
  const { selected, accessUser } = useSelector(authUser);

  useEffect(() => {
    if (accessUser?.id) {
      socket.emit("login", accessUser.id);
      socket.auth = {
        authId: accessUser.id,
      };
      socket.connect();
    }
  }, [accessUser]);

  return (
    <nav className="w-full font-Rubik font-semibold border-b p-3">
      <div className="flex justify-between px-3 w-full items-center">
        <div className="w-2/3">
          <p>{selected}</p>
        </div>
        <div className="w-2/3">
          <p>{date}</p>
        </div>
        <div className="flex w-1/3 items-center justify-end gap-4">
          <Link to={`/messages/t`}>
            <LuMessageSquare className="w-[30px] h-[30px]" />
          </Link>
          <Avatar alt="s" size="sm" stacked rounded />
          <p>{accessUser?.username}</p>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
