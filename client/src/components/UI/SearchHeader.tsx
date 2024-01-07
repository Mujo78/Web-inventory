import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  placeholder: string;
  className?: string;
};

const SearchHeader: React.FC<Props> = ({
  children,
  placeholder,
  className,
}) => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [search, setSearch] = useState<string>("");

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
      <form
        onSubmit={onSubmit}
        className={`${className} w-2/4 mx-auto flex gap-3`}
      >
        <TextInput
          className="w-full"
          placeholder={placeholder}
          name="search"
          value={search}
          onChange={(e) => onChangeSearch(e)}
        />
        <Button size="md" color="success" type="submit">
          Search
        </Button>
      </form>
      {children}
    </header>
  );
};

export default SearchHeader;
