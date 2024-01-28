import { Avatar, Button, Dropdown, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { TbDots } from "react-icons/tb";
import { LuSendHorizonal } from "react-icons/lu";
import socket from "../../socket";
import ChatMessages from "./ChatMessages";
import { useNavigate, useParams } from "react-router-dom";
import { formatUserName } from "../../helpers/UserSideFunctions";
import { useSelector } from "react-redux";
import {
  chat,
  deleteInboxWithPerson,
  getInboxById,
  resetSelectedInbox,
} from "../../features/chat/chatSlice";
import CustomSpinner from "../UI/CustomSpinner";
import { useAppDispatch } from "../../app/hooks";

export type StatusType = "away" | "busy" | "offline" | "online" | undefined;

const Chat = () => {
  const { inboxId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const { selectedInbox, message: infoMessage, status } = useSelector(chat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inboxId) {
      dispatch(getInboxById({ inboxId }));
    }

    return () => {
      dispatch(resetSelectedInbox());
    };
  }, [dispatch, inboxId]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message !== "" && inboxId && selectedInbox) {
      socket.emit("sendMessage", {
        content: message,
        receiverId: selectedInbox.participant?._id,
        inboxId,
      });

      setMessage("");
    }
  };

  const deleteChat = () => {
    if (inboxId) {
      dispatch(deleteInboxWithPerson({ inboxId })).then(() => {
        navigate(".");
      });
    }
  };

  useEffect(() => {
    if (inboxId) {
      const room = inboxId;
      if (message !== "") {
        socket.emit("typingMessage", room);
      } else {
        socket.emit("stopTyping", room);
      }
    }
  }, [message, inboxId]);

  return (
    <>
      {status === "start" || status === "loading" ? (
        <CustomSpinner />
      ) : selectedInbox ? (
        <div className="pl-3 flex flex-col justify-between overflow-hidden h-full">
          <header className="border-b h-20 border-gray-300">
            <div className="flex justify-between items-center p-5">
              <div className="flex items-center gap-5">
                <Avatar size="md" rounded statusPosition="bottom-right" />
                <div>
                  <h1 className="font-semibold">
                    {formatUserName(selectedInbox.participant.username)}
                  </h1>
                  <span
                    className={
                      selectedInbox.participant.status === "online"
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {selectedInbox.participant.status === "online"
                      ? "Active now"
                      : "Offline"}
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
      ) : status !== "failed" && !selectedInbox ? (
        <CustomSpinner />
      ) : (
        status === "failed" && <p className="ml-12 mt-12">{infoMessage}</p>
      )}
    </>
  );
};

export default Chat;
