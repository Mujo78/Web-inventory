import React, { useEffect, useState } from "react";
import SearchHeader from "../UI/SearchHeader";
import PersonMessage from "./PersonMessage";
import { useSelector } from "react-redux";
import { authUser } from "../../features/auth/authSlice";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export type lastMessageType = {
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
};

export type UserDataType = {
  _id: string;
  username: string;
  status: "away" | "busy" | "offline" | "online" | undefined;
};

export type InboxType = {
  _id: string;
  deletedBy: string;
  lastMessage: lastMessageType;
  participant: UserDataType;
};

const Messages = () => {
  const { accessUser } = useSelector(authUser);
  const [value, setValue] = useState<InboxType[]>();
  const { receiverId } = useParams();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get("/api/inbox", {
        headers: {
          Authorization: `Bearer ${accessUser?.accessToken}`,
        },
      });

      setValue(res.data);
    }

    if (accessUser) {
      getData();
    }
  }, [accessUser]);

  useEffect(() => {
    if (!receiverId && value) {
      navigate(`${location}/${value[0].participant._id}`);
    }
  }, [location, navigate, value, receiverId]);

  return (
    <div className="h-[89vh] w-full flex flex-col px-3 py-2 items-start gap-6">
      <SearchHeader placeholder="Name" className="w-full" />
      <div className="flex-grow-1 w-full flex flex-col gap-1">
        {value && value.length > 0 ? (
          value?.map((m) => <PersonMessage key={m._id} {...m} />)
        ) : (
          <p>Empty</p>
        )}
      </div>
    </div>
  );
};

export default Messages;
