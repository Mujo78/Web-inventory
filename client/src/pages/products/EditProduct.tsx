import React, { useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationProductSchema } from "../../validations/productValidation";
import {
  Product,
  editProduct,
  getProduct,
  product,
  resetProduct,
} from "../../features/product/productSlice";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import axios from "axios";
import { stateProcessInterface } from "./AddProduct";
import CustomSpinner from "../../components/UI/CustomSpinner";

const EditProduct: React.FC = () => {
  const isEditing = true;
  const validationSchema = validationProductSchema(isEditing);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [processes, setProcesses] = useState<stateProcessInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/free-processes")
      .then((res) => setProcesses(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(resetProduct());
    };
  }, [id, dispatch]);

  const { status, message, specificProduct } = useSelector(product);

  const initialState: Product = {
    _id: specificProduct?._id || "",
    name: specificProduct?.name || "",
    photo_url: specificProduct?.photo_url || "",
    product_process_id: specificProduct?.product_process_id || "",
    mark_up: specificProduct?.mark_up || 0,
    price: specificProduct?.price || 0,
  };

  const goBack = () => {
    navigate("/products");
  };

  const handleSubmit = (productData: Product) => {
    if (id) {
      dispatch(editProduct({ id, productData })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate("/products");
        }
      });
    }
  };

  return (
    <>
      <Header title="Edit Product" other={specificProduct?._id} />

      {specificProduct ? (
        <Formik
          enableReinitialize={true}
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex justify-center items-center mt-6 flex-col">
                <div className="border border-gray-300 rounded-lg p-8 ">
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <img
                          src={initialState.photo_url}
                          style={{ height: "300px", width: "350px" }}
                          alt="product_photo"
                        />
                      </div>
                      <div className="flex flex-col ml-5">
                        <div>
                          <div className="mb-2 block">
                            <Label htmlFor="name" value="Product name" />
                          </div>
                          <Field
                            as={TextInput}
                            id="name"
                            color={errors.name && touched.name && "failure"}
                            name="name"
                            required
                            type="text"
                          />
                          <div className="h-6">
                            {status === "failed" && !errors.name && (
                              <span className="text-xs text-red-500">
                                {message}
                              </span>
                            )}
                            <ErrorMessage
                              name="name"
                              component="span"
                              className="text-red-500 text-xs"
                            />
                          </div>
                        </div>
                        <div className="flex">
                          <div className="mr-2">
                            <div className="mb-2 block">
                              <Label htmlFor="price" value="Price" />
                            </div>
                            <Field
                              as={TextInput}
                              id="price"
                              required
                              color={errors.price && touched.price && "failure"}
                              name="price"
                              type="number"
                            />
                            <div className="h-6">
                              <ErrorMessage
                                name="price"
                                component="span"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="ml-2">
                            <div className="mb-2 block">
                              <Label htmlFor="mark_up" value="Mark up" />
                            </div>
                            <Field
                              as={TextInput}
                              id="mark_up"
                              required
                              color={
                                errors.mark_up && touched.mark_up && "failure"
                              }
                              name="mark_up"
                              type="number"
                            />
                            <div className="h-6">
                              <ErrorMessage
                                name="mark_up"
                                component="span"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 block">
                            <Label
                              htmlFor="product_process_id"
                              value="Product Process"
                            />
                          </div>
                          <Field
                            as={Select}
                            disabled={!processes}
                            id="product_process_id"
                            required
                            name="product_process_id"
                            type="number"
                          >
                            {processes.map((p) => (
                              <option key={p._id} value={p._id}>
                                {p.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 mt-2 block">
                        <Label htmlFor="photo_url" value="Photo URL" />
                      </div>
                      <Field
                        as={TextInput}
                        color={
                          errors.photo_url && touched.photo_url && "failure"
                        }
                        id="photo_url"
                        name="photo_url"
                        required
                        type="url"
                      />
                      <div className="h-4">
                        <ErrorMessage
                          name="photo_url"
                          component="span"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button onClick={goBack} color="light" className="mr-5">
                      Cancel
                    </Button>
                    <Button type="submit" color="success" className=" w-1/4">
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <CustomSpinner />
      )}
    </>
  );
};

export default EditProduct;
