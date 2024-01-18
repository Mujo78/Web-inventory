import { Avatar, Button, Dropdown, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { TbDots } from "react-icons/tb";
import { LuSendHorizonal } from "react-icons/lu";
import socket from "../../socket";
import ChatMessages from "./ChatMessages";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id, receiverId } = useParams();
  const [message, setMessage] = useState<string>("");

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

  const deleteChat = () => {
    console.log("object");
  };

  return (
    <div className="pl-3 flex flex-col justify-between h-full">
      <header className="border-b h-24 border-gray-300">
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-5">
            <Avatar size="md" rounded statusPosition="bottom-right" />
            <div>
              <h1 className="font-semibold">Username.username</h1>
              <span className="text-green-600">Active now</span>
            </div>
          </div>
          <Dropdown inline arrowIcon={false} label={<TbDots size={32} />}>
            <Dropdown.Item onClick={deleteChat}>Delete chat</Dropdown.Item>
          </Dropdown>
        </div>
      </header>
      <main className="flex-grow flex items-start overflow-auto justify-start">
        <ChatMessages />
      </main>
      <footer className="border-t h-24 p-3">
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
