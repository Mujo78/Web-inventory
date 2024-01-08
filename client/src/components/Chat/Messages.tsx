import React from "react";
import SearchHeader from "../UI/SearchHeader";
import PersonMessage from "./PersonMessage";

const Messages = () => {
  return (
    <div className="h-[89vh] w-full flex flex-col px-3 py-2 items-start gap-6">
      <SearchHeader placeholder="Name" className="w-full" />
      <div className="flex-grow-1 w-full">
        <PersonMessage />
      </div>
    </div>
  );
};

export default Messages;
