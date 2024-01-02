import React from "react";
import useSelectedPage from "../hooks/useSelectedPage";

const Employee: React.FC = () => {
  useSelectedPage("Employee");

  return <div>Employee page here</div>;
};

export default Employee;
