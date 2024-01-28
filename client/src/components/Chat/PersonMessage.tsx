import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socket from "../../socket";
import {
  InboxType,
  addLastMessage,
  chat,
  updateMessageStatus,
  updateUserStatus,
} from "../../features/chat/chatSlice";
import { convertTimeMessage } from "../../utilities/chatHelpers";
import { formatUserName } from "../../helpers/UserSideFunctions";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { StatusType } from "./Chat";

const PersonMessage: React.FC<InboxType> = ({ participant, _id: inboxId }) => {
  const { lastMessagesState } = useSelector(chat);
  const dispatch = useAppDispatch();
  const { _id, status, username } = participant;
  const [userStatus, setUserStatus] = useState<StatusType>(status);
  const [newMessage, setNewMessage] = useState<boolean>(
    !lastMessagesState[inboxId]?.isRead &&
      lastMessagesState[inboxId].senderId === _id
      ? true
      : false
  );
  const navigate = useNavigate();
  const locationPathname = useLocation().pathname;

  const { inboxId: roomId } = useParams();

  useEffect(() => {
    if (inboxId !== undefined) {
      socket.emit("joinRoom", { inboxId });
      dispatch(updateMessageStatus({ inboxId, userId: _id }));
    }
  }, [dispatch, inboxId, _id]);

  useEffect(() => {
    socket.on("updateUserStatus", ({ userId, status }) => {
      if (_id === userId) {
        setUserStatus(status);
        dispatch(updateUserStatus({ status, userId: _id }));
      }
    });

    socket.on("lastMessageHere", ({ messageToSend, roomId }) => {
      dispatch(addLastMessage({ messageToSend, roomId }));
      console.log(messageToSend);
      if (messageToSend.isRead && _id !== messageToSend.senderId) {
        setNewMessage(false);
      }
    });

    return () => {
      socket.off("updateUserStatus");
      socket.off("lastMessageHere");
    };
  }, [status, _id, dispatch, inboxId]);

  const sendMessageTo = () => {
    if (roomId !== inboxId) {
      const baseLocationPath = locationPathname.slice(
        0,
        locationPathname.indexOf("/t") + 2
      );
      socket.emit("joinRoom", { inboxId });
      dispatch(updateMessageStatus({ inboxId, userId: _id }));
      if (!lastMessagesState[inboxId]?.isRead) {
        setNewMessage(true);
      } else {
        setNewMessage(false);
      }
      navigate(`${baseLocationPath}/${inboxId}`);
    }
  };

  console.log(lastMessagesState);

  return (
    <div
      onClick={sendMessageTo}
      className={`${
        roomId === inboxId
          ? "bg-green-100 hover:bg-green-200"
          : newMessage && roomId === inboxId
          ? "bg-gray-200 hover:bg-gray-300"
          : "bg-white"
      } border-y flex items-center gap-6 p-3 transition-all duration-300 cursor-pointer`}
    >
      <Avatar
        size="md"
        rounded
        status={userStatus}
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
          {newMessage && roomId === inboxId && (
            <div className="h-3 w-3 bg-blue-500 p-2 rounded-full"></div>
          )}
          {lastMessagesState[inboxId]?.createdAt && (
            <span>
              {convertTimeMessage(lastMessagesState[inboxId]?.createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonMessage;
