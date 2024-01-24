import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socket from "../../socket";
import {
  InboxType,
  addLastMessage,
  chat,
  updateMessageStatus,
} from "../../features/chat/chatSlice";
import { convertTimeMessage } from "../../utilities/chatHelpers";
import { formatUserName } from "../../helpers/UserSideFunctions";
import { StatusType } from "./Chat";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";

const PersonMessage: React.FC<InboxType> = ({ participant, _id: inboxId }) => {
  const { lastMessagesState } = useSelector(chat);
  const dispatch = useAppDispatch();
  const { _id, status, username } = participant;
  const [statusUser, setStatusUser] = useState<StatusType>(status);

  const [newMessage, setNewMessage] = useState<boolean>(
    lastMessagesState[inboxId].isRead
  );
  const navigate = useNavigate();
  const locationPathname = useLocation().pathname;

  const { receiverId: recId } = useParams();

  useEffect(() => {
    if (recId !== undefined) {
      const receiverId = recId;
      socket.emit("joinRoom", { receiverId });
      dispatch(updateMessageStatus(inboxId));
    }
  }, [_id, recId, dispatch, inboxId]);

  useEffect(() => {
    socket.on("updateUserStatus", ({ userId, status }) => {
      if (_id === userId) setStatusUser(status);
    });

    return () => {
      socket.off("updateUserStatus");
    };
  }, [_id]);

  useEffect(() => {
    socket.on("lastMessageHere", ({ messageToSend, roomId }) => {
      dispatch(addLastMessage({ messageToSend, roomId }));
    });

    return () => {
      socket.off("lastMessageHere");
    };
  }, [dispatch]);

  const sendMessageTo = () => {
    if (_id !== recId) {
      const receiverId = _id;
      const baseLocationPath = locationPathname.slice(
        0,
        locationPathname.indexOf("/t") + 2
      );
      socket.emit("joinRoom", { receiverId });
      if (!lastMessagesState[inboxId]?.isRead) {
        setNewMessage(false);
      } else {
        setNewMessage(true);
      }
      navigate(`${baseLocationPath}/${receiverId}`);
    }
  };

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
          <h1 className="font-semibold">{formatUserName(username)}</h1>
          <span className="line-clamp-1">
            {lastMessagesState[inboxId]?.content}
          </span>
        </div>
        <div className="flex flex-col gap-4 items-end">
          {newMessage && _id === recId && (
            <div className="h-3 w-3 bg-blue-500 p-2 rounded-full"></div>
          )}
          <span>
            {convertTimeMessage(lastMessagesState[inboxId]?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonMessage;
