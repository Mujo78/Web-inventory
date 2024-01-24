import { useEffect } from "react";
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

const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const { accessUser } = useSelector(authUser);
  const { receiverId } = useParams();

  useEffect(() => {
    if (receiverId && accessUser) {
      dispatch(getInboxChatHistory({ receiverId }));
    }
  }, [receiverId, accessUser, dispatch]);

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(addNewMessage(data));
    });

    socket.on("updateMessageStatusRead", (data) => {
      dispatch(updateMessageStatus(data));
    });

    return () => {
      socket.off("message");
      socket.off("updateMessageStatus");
    };
  }, [dispatch]);

  const { messages, status, message } = useSelector(chat);

  return (
    <>
      <div className="transition-all duration-300 w-full px-3 py-3 flex flex-col gap-2">
        {status === "start" ? (
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
        ) : status !== "failed" ? (
          <CustomSpinner />
        ) : (
          <p>{message}</p>
        )}
      </div>
    </>
  );
};

export default ChatMessages;
