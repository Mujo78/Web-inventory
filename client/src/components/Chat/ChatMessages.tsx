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
  isRead: boolean;
  createdAt: Date;
};

const ChatMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [infoMessage, setInfoMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { accessUser } = useSelector(authUser);
  const { receiverId } = useParams();

  useEffect(() => {
    async function getChatHistory() {
      try {
        if (accessUser && receiverId) {
          setLoading(true);
          const res = await getInboxChat(accessUser?.accessToken, receiverId);
          setMessages(res);

          setLoading(false);
        }
      } catch (error: any) {
        setInfoMessage(error);
        setLoading(false);
      } finally {
        setLoading(false);
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
      <div className="transition-all duration-300 w-full px-3 py-3 flex flex-col gap-2">
        {loading ? (
          <CustomSpinner />
        ) : messages.length > 0 ? (
          messages.map((value) => (
            <TextMessage
              key={value._id}
              createdAt={value.createdAt}
              message={value.content}
              sender={value.senderId}
              isRead={value.isRead}
            />
          ))
        ) : (
          infoMessage && <p>{infoMessage}</p>
        )}
      </div>
    </>
  );
};

export default ChatMessages;
