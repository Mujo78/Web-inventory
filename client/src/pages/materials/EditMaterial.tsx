import { Alert, Button, Label, Select, TextInput } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { materialValidationSchema } from "../../validations/materialValidation";
import { useSelector } from "react-redux";
import {
  MaterialInterface,
  editMaterial,
  getMaterial,
  material,
  resetMaterial,
} from "../../features/material/materialSlice";
import { useAppDispatch } from "../../app/hooks";
import { getSuppliers, supplier } from "../../features/supplier/suppSlice";
import { useNavigate, useParams } from "react-router-dom";
import CustomSpinner from "../../components/UI/CustomSpinner";
import Header from "../../components/UI/Header";
import useSelectedPage from "../../hooks/useSelectedPage";

const EditMaterial: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useSelectedPage("Materials");

  useEffect(() => {
    if (id) {
      dispatch(getMaterial(id));
    }

    return () => {
      dispatch(resetMaterial());
    };
  }, [dispatch, id]);

  const { suppliers } = useSelector(supplier);
  const { status, message, specificMaterial } = useSelector(material);

  const initialState: MaterialInterface = {
    name: specificMaterial?.name || "",
    supplier_id: specificMaterial?.supplier_id || "",
    min_quantity: specificMaterial?.min_quantity || 0,
    quantity: specificMaterial?.quantity || 0,
    price: specificMaterial?.price || 0,
    unit_of_measure: specificMaterial?.unit_of_measure || "",
  };

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const handleEdit = (materialData: MaterialInterface) => {
    if (id) {
      dispatch(editMaterial({ id, materialData })).then((action) => {
        if (typeof action.payload === "object") navigate("/materials");
      });
    }
  };

  const goBack = () => {
    navigate("/materials");
  };

  return (
    <>
      <Header title="Edit Material" other={specificMaterial?._id} />
      <>
        <div className="h-8 mt-1 mb-2">
          {status === "failed" && (
            <Alert color="failure">
              <span className="text-xs text-red-600">{message}</span>
            </Alert>
          )}
        </div>

        {specificMaterial ? (
          <Formik
            enableReinitialize={true}
            initialValues={initialState}
            validationSchema={materialValidationSchema}
            onSubmit={handleEdit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col justify-center items-center mt-6">
                <div className="w-2/4 border rounded-lg p-10">
                  <div className="flex">
                    <div className="w-3/5">
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Name*" />
                      </div>
                      <Field
                        as={TextInput}
                        color={errors.name && touched.name && "failure"}
                        id="name"
                        name="name"
                        autoComplete="off"
                        placeholder="Name"
                        type="text"
                      />
                      <div className="h-7">
                        <ErrorMessage
                          name="name"
                          component="span"
                          className="text-red-600 text-xs"
                        />
                      </div>
                    </div>
                    <div className="ml-auto w-2/6">
                      <div className="mb-2 block">
                        <Label htmlFor="min_quantity" value="Min Quantity*" />
                      </div>
                      <Field
                        as={TextInput}
                        color={
                          errors.min_quantity &&
                          touched.min_quantity &&
                          "failure"
                        }
                        id="min_quantity"
                        type="number"
                        name="min_quantity"
                        min={0}
                        max={100}
                      />
                      <div className="h-7">
                        <ErrorMessage
                          name="min_quantity"
                          component="span"
                          className=" text-red-600 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-3/5">
                      <div className="mb-2 block">
                        <Label htmlFor="supplier_id" value="Supplier*" />
                      </div>
                      <Field
                        as={Select}
                        color={
                          errors.supplier_id && touched.supplier_id && "failure"
                        }
                        id="supplier_id"
                        name="supplier_id"
                      >
                        <option value="">Choose one option</option>
                        {suppliers.data.length > 0 &&
                          suppliers.data.map((n) => (
                            <option key={n._id} value={n._id}>
                              {n.name}
                            </option>
                          ))}
                      </Field>
                      <div className="h-7">
                        <ErrorMessage
                          name="supplier_id"
                          component="span"
                          className="text-red-600 text-xs"
                        />
                      </div>
                    </div>
                    <div className="ml-auto w-2/6">
                      <div className="mb-2 block">
                        <Label htmlFor="quantity" value="Quantity*" />
                      </div>
                      <Field
                        as={TextInput}
                        color={errors.quantity && touched.quantity && "failure"}
                        id="quantity"
                        type="number"
                        name="quantity"
                        min={initialState.min_quantity}
                        max={100}
                      />
                      <ErrorMessage
                        name="quantity"
                        component="span"
                        className=" text-red-600 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-3/5">
                      <div className="mb-2 block">
                        <Label htmlFor="unit_of_measure" value="Unit*" />
                      </div>
                      <Field
                        as={TextInput}
                        color={
                          errors.unit_of_measure &&
                          touched.unit_of_measure &&
                          "failure"
                        }
                        id="unit_of_measure"
                        placeholder="Kg"
                        type="text"
                        name="unit_of_measure"
                      />
                      <div className="h-4">
                        <ErrorMessage
                          name="unit_of_measure"
                          component="span"
                          className="text-red-600 text-xs"
                        />
                      </div>
                    </div>
                    <div className="w-2/6">
                      <div className="mb-2 block">
                        <Label htmlFor="price" value="Price*" />
                      </div>
                      <Field
                        as={TextInput}
                        color={errors.price && touched.price && "failure"}
                        id="price"
                        type="number"
                        name="price"
                        min={0}
                        max={100}
                      />
                      <div className="h-4">
                        <ErrorMessage
                          name="price"
                          component="span"
                          className=" text-red-600 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between flex-wrap gap-3 mt-7">
                    <Button
                      type="button"
                      onClick={goBack}
                      className=" px-6"
                      color="light"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className=" px-6" color="success">
                      Save changes
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <CustomSpinner />
        )}
      </>
    </>
  );
};

export default EditMaterial;
