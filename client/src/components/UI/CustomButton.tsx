import { Button } from "flowbite-react";
import React from "react";

interface BtnProps {
  children: React.ReactNode;
  className?: string;
  v: number;
  size?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<BtnProps> = ({
  children,
  className = "",
  size = "sm",
  onClick,
  v = 1,
}) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={
        className
          ? className
          : `ml-auto px-0 py-0 hover:!bg-white ${
              v === 1 ? `focus:ring-green-500` : `focus:ring-red-500`
            }  hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white`
      }
    >
      {children}
    </Button>
  );
};

export default CustomButton;
