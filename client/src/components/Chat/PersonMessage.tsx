import { Avatar } from "flowbite-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socket from "../../socket";
import { InboxType } from "./Messages";

const PersonMessage: React.FC<InboxType> = ({ lastMessage, participant }) => {
  const { _id, status, username } = participant;
  const navigate = useNavigate();
  const locationPathname = useLocation().pathname;

  const { receiverId: recId } = useParams();

  useEffect(() => {
    if (recId && recId !== _id) {
      const receiverId = recId;
      socket.emit("joinRoom", { receiverId });
    }
  }, [_id, recId]);

  const sendMessageTo = () => {
    if (_id !== recId) {
      const receiverId = _id;
      const baseLocationPath = locationPathname.slice(
        0,
        locationPathname.indexOf("/t") + 2
      );
      socket.emit("joinRoom", { receiverId });
      navigate(`${baseLocationPath}/${receiverId}`);
    }
  };

  return (
    <div
      onClick={sendMessageTo}
      className={`${
        _id === recId
          ? "bg-green-100 hover:bg-green-200"
          : "bg-gray-100 hover:bg-gray-200"
      } border-y flex items-center gap-6 p-3 transition-all duration-300 cursor-pointer`}
    >
      <Avatar size="md" rounded status={status} statusPosition="bottom-right" />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">{username}</h1>
          <p className="line-clamp-1 flex gap-3 items-center">
            <span>{lastMessage.date.toString()}</span>
            <span>{lastMessage.content}</span>
          </p>
        </div>
        <div className="h-3 w-3 bg-blue-500 p-2 rounded-full"></div>
      </div>
    </div>
  );
};

export default PersonMessage;
