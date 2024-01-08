import React from "react";
import Messages from "../components/Chat/Messages";
import Chat from "../components/Chat/Chat";

const MessagesCenter = () => {
  return (
    <div className="h-[89vh] w-full flex items-center justify-center divide-x divide-gray-400">
      <div className="w-1/3 h-full">
        <Messages />
      </div>
      <div className="w-2/3 h-full">
        <Chat />
      </div>
    </div>
  );
};

export default MessagesCenter;
