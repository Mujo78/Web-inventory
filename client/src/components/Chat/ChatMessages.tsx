import React, { useEffect, useState } from "react";
import TextMessage from "./TextMessage";
import socket from "../../socket";
import { getInboxChat } from "../../helpers/ChatSideFunctions";
import { useSelector } from "react-redux";
import { authUser } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";
import CustomSpinner from "../UI/CustomSpinner";

export type MessageType = {
  _id: string;
  content: string;
  senderId: string;
  receiverId: string;
  isRead?: boolean;
  createdAt?: Date;
};

const ChatMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [infoMessage, setInfoMessage] = useState<string>();
  const { accessUser } = useSelector(authUser);
  const { receiverId } = useParams();

  useEffect(() => {
    async function getChatHistory() {
      try {
        if (accessUser && receiverId) {
          const res = await getInboxChat(accessUser?.accessToken, receiverId);
          setMessages(res);
        }
      } catch (error: any) {
        setInfoMessage(error);
      }
    }

    getChatHistory();
  }, [receiverId, accessUser]);

  useEffect(() => {
    socket.on("noPreviousMessages", () => {
      setInfoMessage("No previous messages with this user!");
    });

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);

      setInfoMessage("");
    });

    return () => {
      socket.off("message");
      socket.off("noPreviousMessages");
    };
  }, [messages]);

  return (
    <>
      <div className="flex flex-col gap-3 w-full p-3">
        {messages.length > 0 ? (
          messages.map((value) => (
            <TextMessage
              key={value._id}
              receiver={value.receiverId}
              message={value.content}
              sender={value.senderId}
            />
          ))
        ) : messages ? (
          <CustomSpinner />
        ) : (
          <p>{infoMessage}</p>
        )}
      </div>
    </>
  );
};

export default ChatMessages;
