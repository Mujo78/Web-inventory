import { Avatar } from "flowbite-react";
import React from "react";

const PersonMessage = () => {
  return (
    <>
      <div className="border-y flex items-center gap-6 p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer">
        <Avatar size="md" rounded />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">username.username</h1>
            <p>21:32 - Some message</p>
          </div>
          <div className="h-3 w-3 bg-green-500 p-2 rounded-full"></div>
        </div>
      </div>
      <div className="border-y flex items-center gap-6 p-3 hover:bg-gray-100 cursor-pointer">
        <Avatar size="md" rounded />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">username.username</h1>
            <p className="line-clamp-1">
              21:32 - Some
              messagesadasdasdasdasdasasdasdasdaasdasdasdasdasdasdsa
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonMessage;
