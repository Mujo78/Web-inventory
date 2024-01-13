import { Avatar, Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { TbDots } from "react-icons/tb";
import { LuSendHorizonal } from "react-icons/lu";
import socket from "../../socket";
import ChatMessages from "./ChatMessages";
import { useParams } from "react-router-dom";

export type MessageType = {
  content: string;
  from: string;
};

const Chat = () => {
  const { id, receiverId } = useParams();
  const [message, setMessage] = useState<string>("");
  const [infoMessage, setInfoMessage] = useState<string>();
  const [messages, setMessages] = useState<MessageType[]>([]);

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
    socket.on("noPreviousMessages", () => {
      setInfoMessage("No previous messages with this user!");
    });

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);

      setInfoMessage("");
    });

    return () => {
      socket.off("message");
      socket.off("noPreviousMessages");
    };
  }, [messages]);

  return (
    <div className="pl-3 flex flex-col justify-between h-full">
      <header className="border-b border-gray-300">
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-5">
            <Avatar size="md" rounded statusPosition="bottom-right" />
            <div>
              <h1 className="font-semibold">Username.username</h1>
              <span className="text-green-600">Active now</span>
            </div>
          </div>
          <button>
            <TbDots size={32} />
          </button>
        </div>
      </header>
      <main className="h-full flex items-center justify-center">
        {messages.length > 0 ? (
          <ChatMessages messages={messages} />
        ) : (
          <p>{infoMessage}</p>
        )}
      </main>
      <footer className="border-t p-3">
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
  );
};

export default Chat;
