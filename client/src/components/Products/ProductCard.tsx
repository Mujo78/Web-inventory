import { Card, CustomFlowbiteTheme } from "flowbite-react";
import React, { useState } from "react";
import { Product } from "../../features/product/productSlice";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const customTheme: CustomFlowbiteTheme["card"] = {
  img: {
    base: "h-48 object-cover md:hover:scale-105 duration-300  transition-all",
    horizontal: {
      off: "rounded-t-lg",
      on: "!h-[20px] w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};

interface Props {
  item: Product;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  const [editIcon, setEditIcon] = useState<boolean>(false);
  const seeMore = (id: string) => {
    console.log(id);
    navigate(`/product/${id}`);
  };

  const handleShowIcon = () => {
    setEditIcon(true);
  };

  const handleHideIcon = () => {
    setEditIcon(false);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.stopPropagation();
    navigate(`/edit-product/${item._id}`);
  };

  return (
    <Card
      theme={customTheme}
      className=" relative m-2 cursor-pointer hover:ease-out hover:!bg-gray-100 overflow-hidden transition-all duration-300 text-center"
      onClick={() => seeMore(item._id)}
      imgSrc={item.photo_url && item.photo_url}
      imgAlt="product_photo"
      onMouseEnter={handleShowIcon}
      onMouseLeave={handleHideIcon}
    >
      {editIcon && (
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2  bg-gray-300 hover:scale-110 transition duration-150 ease-in p-2 rounded-full w-fit"
        >
          <FiEdit className="h-3" />
        </button>
      )}
      <div className="w-full">
        <h1>{item.name}</h1>
        <p>${item.price.toFixed(2)}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
