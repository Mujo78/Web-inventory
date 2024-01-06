import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { getProducts, product } from "../../features/product/productSlice";
import { Alert } from "flowbite-react";
import ProductCard from "../../components/Products/ProductCard";
import CustomSpinner from "../../components/UI/CustomSpinner";
import useSelectedPage from "../../hooks/useSelectedPage";
import IconButton from "../../components/UI/IconButton";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import CustomPagination from "../../components/UI/Pagination";
import { useQuery } from "../../hooks/useQuery";
import SearchHeader from "../../components/UI/SearchHeader";

const Products: React.FC = () => {
  const location = useLocation().pathname;
  const query = useQuery();
  const page = Number(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useSelectedPage("Products");

  useEffect(() => {
    if (searchQuery) {
      dispatch(getProducts({ searchQuery, page }));
      navigate(`${location}?searchQuery=${searchQuery}&page${page}`);
    } else {
      dispatch(getProducts({ page }));
      navigate(`${location}?page${page}`);
    }
  }, [dispatch, page, searchQuery, navigate, location]);

  const { products, message, status } = useSelector(product);

  if (status === "failed") {
    <Alert>
      <h1>{message}</h1>
    </Alert>;
  }

  const handleNavigateToAddProduct = () => {
    navigate("/add-product");
  };

  const handleNavigate = (page: number) => {
    if (searchQuery) {
      dispatch(getProducts({ searchQuery, page }));
      navigate(`${location}?searchQuery=${searchQuery}&page${page}`);
    } else {
      dispatch(getProducts({ page }));
      navigate(`${location}?page${page}`);
    }
  };

  return (
    <div className="relative h-[91vh] overflow-y-hidden">
      {status === "start" ? (
        <CustomSpinner />
      ) : status !== "failed" && products.data.length > 0 ? (
        <div className="flex h-5/6 flex-col gap-3">
          <SearchHeader />
          <div className="flex flex-wrap w-full justify-center items-start">
            {status === "loading" ? (
              <CustomSpinner />
            ) : (
              products.data.map((n) => <ProductCard key={n._id} item={n} />)
            )}
          </div>
        </div>
      ) : status === "failed" ? (
        <Alert color="info">{message}</Alert>
      ) : (
        <CustomSpinner />
      )}

      {products.currentPage && products.numOfPages && (
        <CustomPagination
          totalPages={products.numOfPages}
          currentPage={products.currentPage}
          handleNavigate={handleNavigate}
        />
      )}
      <div className="absolute right-5 top-5">
        <IconButton onClick={handleNavigateToAddProduct}>
          <AiOutlinePlus
            style={{
              color: "green",
              width: 30,
              height: 30,
              fontWeight: "bold",
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default Products;
