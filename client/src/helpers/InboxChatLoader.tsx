import React from "react";
import { Outlet, useParams } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import { UserDataType } from "../features/chat/chatSlice";

const InboxChatLoader = () => {
  const { inboxId } = useParams();

  const data = useAPI<UserDataType>({
    condition: inboxId,
    method: "GET",
    url: `/api/inbox-participant/${inboxId}`,
  });

  return <Outlet />;
};

export default InboxChatLoader;
