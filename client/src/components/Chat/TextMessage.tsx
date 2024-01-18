import React from "react";
import { useParams } from "react-router-dom";

type SingleMessageType = {
  message: string;
  sender: string;
  receiver: string;
};

const TextMessage: React.FC<SingleMessageType> = ({
  message,
  sender,
  receiver,
}) => {
  const { id } = useParams();

  const isMyMessage = id === sender;

  return (
    <p
      className={`${
        isMyMessage ? "ml-auto bg-green-500 text-white" : "mr-auto bg-gray-200 "
      } p-2 rounded-xl`}
    >
      {message}
    </p>
  );
};

export default TextMessage;
