import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socket from "../../socket";
import { InboxType, lastMessageType } from "./Messages";
import { convertTimeMessage } from "../../utilities/chatHelpers";

type StatusType = "away" | "busy" | "offline" | "online" | undefined;
type LastMessagesType = Record<string, lastMessageType>;

const PersonMessage: React.FC<InboxType> = ({
  lastMessage,
  participant,
  _id: inboxId,
}) => {
  const { _id, status, username } = participant;

  const [statusUser, setStatusUser] = useState<StatusType>(status);
  const [lastMessagesState, setLastMessagesState] = useState<LastMessagesType>({
    [inboxId]: lastMessage,
  });
  const navigate = useNavigate();
  const locationPathname = useLocation().pathname;

  const { id, receiverId: recId } = useParams();

  useEffect(() => {
    if (recId !== undefined) {
      const receiverId = recId;
      socket.emit("joinRoom", { receiverId });
    }
  }, [_id, recId]);

  useEffect(() => {
    socket.on("updateUserStatus", ({ userId, status }) => {
      if (_id === userId) setStatusUser(status);
    });
  }, [_id]);

  useEffect(() => {
    socket.on("lastMessageHere", ({ messageToSend, roomId }) => {
      setLastMessagesState((prev) => ({
        ...prev,
        [roomId]: messageToSend,
      }));
    });
  }, [_id, recId, lastMessage]);

  const sendMessageTo = () => {
    if (_id !== recId) {
      const receiverId = _id;
      const baseLocationPath = locationPathname.slice(
        0,
        locationPathname.indexOf("/t") + 2
      );
      socket.emit("joinRoom", { receiverId });
      if (!lastMessagesState[inboxId].isRead) {
        setLastMessagesState((prev) => ({
          ...prev,
          [inboxId]: {
            ...prev[inboxId],
            isRead: true,
          },
        }));
      }
      newMessage = lastMessagesState[inboxId].isRead ? false : true;
      navigate(`${baseLocationPath}/${receiverId}`);
    }
  };

  let newMessage =
    lastMessagesState[inboxId].isRead && id !== _id ? false : true;

  return (
    <div
      onClick={sendMessageTo}
      className={`${
        _id === recId
          ? "bg-green-100 hover:bg-green-200"
          : newMessage
          ? "bg-gray-200 hover:bg-gray-300"
          : "bg-white"
      } border-y flex items-center gap-6 p-3 transition-all duration-300 cursor-pointer`}
    >
      <Avatar
        size="md"
        rounded
        status={statusUser}
        statusPosition="bottom-right"
      />
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">{username}</h1>
          <span className="line-clamp-1">
            {lastMessagesState[inboxId].content}
          </span>
        </div>
        <div className="flex flex-col gap-4 items-end">
          {newMessage && (
            <div className="h-3 w-3 bg-blue-500 p-2 rounded-full"></div>
          )}
          <span>
            {convertTimeMessage(lastMessagesState[inboxId].createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonMessage;
