import { Button, TextInput } from "flowbite-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SupplierHeader() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [search, setSearch] = useState<string>("");

  const addNewSupplier = () => {
    navigate("/add-supplier");
  };

  const onChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search !== "") {
      navigate(`${location}?searchQuery=${search}`);
    }
  };

  return (
    <header className="flex w-full gap-3">
      <form onSubmit={onSubmit} className="w-2/4 mx-auto flex gap-3">
        <TextInput
          className="w-full"
          placeholder="Supplier name/Contact name"
          name="search"
          value={search}
          onChange={(e) => onChangeSearch(e)}
        />
        <Button size="md" color="success" type="submit">
          Search
        </Button>
      </form>
      <Button onClick={addNewSupplier} color="success">
        Add New Supplier +
      </Button>
    </header>
  );
}

export default SupplierHeader;
