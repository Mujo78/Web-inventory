import React from "react";
import { Button } from "flowbite-react";

type Props = {
  forgotPass: boolean;
  setForgotPass: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoForgot: React.FC<Props> = ({ forgotPass, setForgotPass }) => {
  const forgotPassword = () => {
    setForgotPass((n) => !n);
  };
  return (
    <>
      <h1 className=" font-Rubik text-gray-300 text-4xl font-bold pb-7 text-center ">
        Login to Manage your Inventory
      </h1>
      <p className="text-gray-300 mb-10">
        It maining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more
        recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum
      </p>
      <Button color="light" onClick={forgotPassword}>
        Log in
      </Button>
    </>
  );
};

export default InfoForgot;
