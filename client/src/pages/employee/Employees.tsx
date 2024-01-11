import React from "react";
import useSelectedPage from "../../hooks/useSelectedPage";
import SearchHeader from "../../components/UI/SearchHeader";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const Employees: React.FC = () => {
  const navigate = useNavigate();
  useSelectedPage("Employees");

  const addEmployee = () => {
    navigate("/add-employee");
  };

  return (
    <main className="h-[89vh] w-full">
      <SearchHeader placeholder="Employee name">
        <Button color="success" onClick={addEmployee}>
          +Add New
        </Button>
      </SearchHeader>

      <div className="px-6 pt-6">
        <EmployeeTable />
      </div>
    </main>
  );
};

export default Employees;
