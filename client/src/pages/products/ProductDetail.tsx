import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { getProduct, product } from "../../features/product/productSlice";
import useSelectedPage from "../../hooks/useSelectedPage";
import { useNavigate, useParams } from "react-router-dom";
import CustomSpinner from "../../components/UI/CustomSpinner";
import { Alert, Button } from "flowbite-react";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, specificProduct, message } = useSelector(product);

  useEffect(() => {
    if (id) {
      dispatch(getProduct({ id }));
    }
  }, [id, dispatch]);

  useSelectedPage("Products");

  return (
    <div className="h-[89vh]">
      <header className="w-full flex justify-between items-center h-fit">
        <button onClick={() => navigate(-1)}>
          <MdOutlineArrowRightAlt
            style={{ height: 41, width: 41 }}
            className="hover:scale-105 transition-all duration-300 rotate-180"
          />
        </button>
        {id && status !== "failed" && (
          <Button
            color="success"
            onClick={() => navigate(`/edit-product/${id}`)}
          >
            Edit product
          </Button>
        )}
      </header>
      {status === "start" ? (
        <CustomSpinner />
      ) : specificProduct && status === "idle" ? (
        <div className="w-full flex items-center justify-center gap-44 px-14 h-5/6">
          <img
            src={specificProduct?.photo_url}
            alt="Product_photo"
            className="h-128 shadow-2xl w-full"
          />
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl">{specificProduct.name}</h1>
              <p className="text-5xl font-bold text-center">
                ${specificProduct.price.toFixed(2)}
              </p>
              <p className="flex justify-between">
                Markup: <span> {specificProduct.mark_up}</span>
              </p>
            </div>
            <hr />
            <h2>Process details</h2>
            {typeof specificProduct.product_process_id === "object" && (
              <>
                <h2 className="text-2xl">
                  {specificProduct.product_process_id.name}
                </h2>
                <p className="text-3xl font-bold text-center">
                  ${specificProduct.product_process_id.price.toFixed(2)}
                </p>
                {specificProduct.product_process_id.start_date && (
                  <p className="text-lg">
                    <span className="text-green-600">Start Date: </span>
                    {specificProduct.product_process_id.start_date?.toString()}
                  </p>
                )}
                {specificProduct.product_process_id.end_date && (
                  <p className="text-lg">
                    <span className="text-red-600">End Date: </span>
                    {specificProduct.product_process_id.end_date.toString()}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      ) : status === "loading" ? (
        <CustomSpinner />
      ) : (
        status === "failed" && (
          <Alert className="flex justify-center items-center w-1/2 mx-auto">
            {message}
          </Alert>
        )
      )}
    </div>
  );
};

export default ProductDetail;
