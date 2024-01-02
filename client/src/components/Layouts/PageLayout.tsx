import React, { useState } from "react";
import { Alert, Navbar } from "flowbite-react";
import { Outlet } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface Props {
  children: React.ReactNode;
  title?: string;
  alert?: boolean;
}

const PageLayout: React.FC<Props> = ({ children, title, alert }) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const dismissIt = () => {
    setShowAlert((n) => !n);
  };

  return (
    <div className="w-full">
      {alert
        ? showAlert && (
            <Alert
              color="success"
              className="w-full font-semibold"
              onDismiss={dismissIt}
              icon={AiOutlineInfoCircle}
            >
              {title}
            </Alert>
          )
        : ""}
      {children && (
        <Navbar className="!bg-gray-200 py-4 !border-gray-400" fluid rounded>
          <Navbar.Toggle />
          <Navbar.Collapse>{children}</Navbar.Collapse>
        </Navbar>
      )}

      <Outlet />
    </div>
  );
};

export default PageLayout;
