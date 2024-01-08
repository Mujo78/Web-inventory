import { Avatar, Button, TextInput } from "flowbite-react";
import React from "react";
import { TbDots } from "react-icons/tb";
import { LuSendHorizonal } from "react-icons/lu";
import TextMessage from "./TextMessage";

const Chat = () => {
  return (
    <div className="pl-3 flex flex-col justify-between h-full">
      <header className="border-b border-gray-300">
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-5">
            <Avatar
              size="md"
              rounded
              status="online"
              statusPosition="bottom-right"
            />
            <div>
              <h1 className="font-semibold">Username.username</h1>
              <span>Active now</span>
            </div>
          </div>
          <button>
            <TbDots size={32} />
          </button>
        </div>
      </header>
      <main className="h-full flex items-center justify-center">
        <TextMessage />
      </main>
      <footer className="border-t p-3">
        <form>
          <div className="flex items-center gap-3">
            <TextInput className="flex-grow" />
            <Button color="success">
              <LuSendHorizonal size={20} />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
