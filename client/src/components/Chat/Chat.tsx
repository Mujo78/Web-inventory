import { Avatar, Button, Dropdown, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { TbDots } from "react-icons/tb";
import { LuSendHorizonal } from "react-icons/lu";
import socket from "../../socket";
import ChatMessages from "./ChatMessages";
import { useParams } from "react-router-dom";
import { formatUserName, getUserInfo } from "../../helpers/UserSideFunctions";
import { useSelector } from "react-redux";
import { authUser } from "../../features/auth/authSlice";
import { UserDataType } from "./Messages";
import CustomSpinner from "../UI/CustomSpinner";

export type StatusType = "away" | "busy" | "offline" | "online" | undefined;

const Chat = () => {
  const { id, receiverId } = useParams();
  const [message, setMessage] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserDataType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType>();
  const { accessUser } = useSelector(authUser);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message !== "" && id && receiverId) {
      socket.emit("sendMessage", {
        content: message,
        receiverId: receiverId,
        senderId: id,
      });

      setMessage("");
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        if (accessUser && receiverId) {
          setLoading(true);
          const res = await getUserInfo(accessUser?.accessToken, receiverId);
          setUserInfo(res);

          setLoading(false);
        }
      } catch (error: any) {
        setInfoMessage(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [receiverId, accessUser]);

  useEffect(() => {
    if (userInfo?.status) setStatus(status);
  }, [userInfo?.status, status]);

  const deleteChat = () => {
    console.log("object");
  };

  useEffect(() => {
    socket.on("updateUserStatus", ({ userId, status }) => {
      if (userInfo?._id === userId) setStatus(status);
    });
  }, [userInfo?._id]);

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : userInfo ? (
        <div className="pl-3 flex flex-col justify-between overflow-hidden h-full">
          <header className="border-b h-20 border-gray-300">
            <div className="flex justify-between items-center p-5">
              <div className="flex items-center gap-5">
                <Avatar size="md" rounded statusPosition="bottom-right" />
                <div>
                  <h1 className="font-semibold">
                    {formatUserName(userInfo.username)}
                  </h1>
                  <span
                    className={
                      status === "online" ? "text-green-600" : "text-gray-500"
                    }
                  >
                    {status === "online" ? "Active now" : "Offline"}
                  </span>
                </div>
              </div>
              <Dropdown inline arrowIcon={false} label={<TbDots size={32} />}>
                <Dropdown.Item onClick={deleteChat}>Delete chat</Dropdown.Item>
              </Dropdown>
            </div>
          </header>
          <main
            className="flex-grow h-full flex items-start overflow-y-auto justify-start"
            id="content"
          >
            <ChatMessages />
          </main>
          <footer className="border-t h-20 p-3">
            <form onSubmit={onSubmit}>
              <div className="flex items-center gap-3">
                <TextInput
                  className="flex-grow"
                  name="message"
                  value={message}
                  onChange={(e) => onChange(e)}
                  placeholder="Input some text"
                />
                <Button color="success" type="submit">
                  <LuSendHorizonal size={20} />
                </Button>
              </div>
            </form>
          </footer>
        </div>
      ) : (
        !userInfo && <p>{infoMessage}</p>
      )}
    </>
  );
};

export default Chat;
