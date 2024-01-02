import React from "react";
import CustomToast from "./CustomToast";

interface Props {
  children?: React.ReactNode;
  title: string;
  other?: string;
  status?: string;
  message?: string;
}

const Header: React.FC<Props> = ({
  title,
  children,
  other,
  status,
  message,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-Rubik text-2xl m-5 font-bold">{title}</h1>
        {other && (
          <h1 className="font-Rubik text-lg m-5 font-bold">{"#" + other}</h1>
        )}
        {(status === "idle" || status === "failed") && message && (
          <CustomToast status={status} message={message} />
        )}
        {children}
      </div>
      <hr />
    </>
  );
};

export default Header;
