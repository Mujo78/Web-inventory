import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { getProducts, product } from "../../features/product/productSlice";
import { Alert } from "flowbite-react";
import ProductCard from "../../components/Products/ProductCard";
import CustomSpinner from "../../components/UI/CustomSpinner";
import useSelectedPage from "../../hooks/useSelectedPage";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  useSelectedPage("Products");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products, message, status } = useSelector(product);

  if (status === "failed") {
    <Alert>
      <h1>{message}</h1>
    </Alert>;
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="flex flex-wrap w-full justify-start items-start">
          {products.map((n) => (
            <ProductCard key={n._id} item={n} />
          ))}
        </div>
      ) : (
        <CustomSpinner />
      )}
    </>
  );
};

export default Products;
