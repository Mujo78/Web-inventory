import { Button } from "flowbite-react";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const IconButton: React.FC<Props> = ({ children, onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} bg-white !w-[81px] !h-[81px] focus:ring-gray-50 shadow-xl hover:bg-white hover:focus:ring-gray-100 flex justify-center items-center hover:transition-all hover:duration-300 !rounded-full`}
    >
      {children}
    </Button>
  );
};

export default IconButton;
