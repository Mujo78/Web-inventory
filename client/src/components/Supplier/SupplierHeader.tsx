import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import SearchHeader from "../UI/SearchHeader";

function SupplierHeader() {
  const navigate = useNavigate();

  const addNewSupplier = () => {
    navigate("/add-supplier");
  };

  return (
    <SearchHeader placeholder="Supplier name/Contact person name">
      <Button onClick={addNewSupplier} color="success">
        Add New Supplier +
      </Button>
    </SearchHeader>
  );
}

export default SupplierHeader;
