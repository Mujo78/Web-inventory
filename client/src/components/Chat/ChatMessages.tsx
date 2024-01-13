import React from "react";
import TextMessage from "./TextMessage";
import { MessageType } from "./Chat";

type ChatMessagesType = {
  messages: MessageType[];
};

const ChatMessages: React.FC<ChatMessagesType> = ({ messages }) => {
  return (
    <>
      <div className="flex flex-col gap-3 h-[200px] w-full bg-gray-300">
        {messages.map((value, index) => (
          <TextMessage key={index} message={value.content} />
        ))}
      </div>
    </>
  );
};

export default ChatMessages;
