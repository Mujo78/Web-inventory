import React, { useState } from "react";
import { convertTimeMessage } from "../../utilities/chatHelpers";
import { useSelector } from "react-redux";
import { authUser } from "../../features/auth/authSlice";

type SingleMessageType = {
  message: string;
  sender: string;
  createdAt: Date;
  isRead: boolean;
};

const TextMessage: React.FC<SingleMessageType> = ({
  message,
  sender,
  isRead,
  createdAt,
}) => {
  const { accessUser } = useSelector(authUser);

  const [see, SetSee] = useState<boolean>(false);
  const isMyMessage = accessUser?.id === sender;

  return (
    <>
      <p
        onClick={() => SetSee((n) => !n)}
        className={`${
          isMyMessage
            ? `ml-auto bg-green-500 text-white ${
                see && "bg-green-600 select-none"
              }`
            : `mr-auto bg-gray-200 ${see && "bg-gray-300 select-none "}`
        } p-2 rounded-xl cursor-pointer `}
      >
        {message}
      </p>
      {see && (
        <span
          className={`${isMyMessage ? "ml-auto" : "mr-auto"}
          text-xs text-gray-800 transform transition-transform ease-out translate-y duration-700`}
        >
          {isRead
            ? isMyMessage
              ? "Seen"
              : `Received - ${convertTimeMessage(createdAt)}`
            : `${isMyMessage ? "Sent" : "Received"} - ${convertTimeMessage(
                createdAt
              )}`}
        </span>
      )}
    </>
  );
};

export default TextMessage;
