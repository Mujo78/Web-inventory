import { Toast } from "flowbite-react";
import React from "react";
import { HiX, HiCheck } from "react-icons/hi";

interface Props {
  status: string;
  message: string;
}

const CustomToast: React.FC<Props> = ({ status, message }) => {
  return (
    <Toast className="border h-2/3 ">
      {status === "failed" && (
        <div
          className={
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
          }
        >
          <HiX className="h-5 w-5" />
        </div>
      )}
      {status === "idle" && (
        <div
          className={
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
          }
        >
          <HiCheck className="h-5 w-5" />
        </div>
      )}

      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
};

export default CustomToast;
