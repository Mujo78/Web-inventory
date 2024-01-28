import { useEffect, useState } from "react";
import TextMessage from "./TextMessage";
import socket from "../../socket";
import { useSelector } from "react-redux";
import { authUser } from "../../features/auth/authSlice";
import { useParams } from "react-router-dom";
import CustomSpinner from "../UI/CustomSpinner";
import {
  addNewMessage,
  chat,
  getInboxChatHistory,
  updateMessageStatus,
} from "../../features/chat/chatSlice";
import { useAppDispatch } from "../../app/hooks";
import TypingDots from "../UI/TypingDots";

const ChatMessages = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { accessUser } = useSelector(authUser);
  const { messages, status, message } = useSelector(chat);
  const { inboxId } = useParams();

  useEffect(() => {
    if (inboxId && accessUser) {
      dispatch(getInboxChatHistory({ inboxId }));
    }
  }, [inboxId, accessUser, dispatch]);

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(addNewMessage(data));
    });

    socket.on("updateMessageStatusRead", (data) => {
      dispatch(updateMessageStatus(data));
    });

    socket.on("userTyping", (data) => {
      if (data !== accessUser?.id) setIsTyping(true);
    });
    socket.on("userStopedTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("message");
      socket.off("updateMessageStatusRead");
    };
  }, [dispatch, accessUser]);

  return (
    <>
      <div className="transition-all duration-300 w-full px-3 py-3 flex flex-col gap-2">
        {status === "start" || status === "loading" ? (
          <CustomSpinner />
        ) : status === "failed" ? (
          <p>{message}</p>
        ) : status !== "idle" && messages.length !== 0 ? (
          <CustomSpinner />
        ) : (
          <>
            {messages.length > 0 &&
              messages.map((value) => (
                <TextMessage
                  key={value._id}
                  createdAt={value.createdAt}
                  message={value.content}
                  sender={value.senderId}
                  isRead={value.isRead}
                />
              ))}
            {isTyping && <TypingDots />}
          </>
        )}
      </div>
    </>
  );
};

export default ChatMessages;
