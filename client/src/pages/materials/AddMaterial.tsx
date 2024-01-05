import { Button, Label, Select, TextInput } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { materialValidationSchema } from "../../validations/materialValidation";
import { useSelector } from "react-redux";
import {
  MaterialInterface,
  createMaterial,
  material,
  reset,
} from "../../features/material/materialSlice";
import { useAppDispatch } from "../../app/hooks";
import { getSuppliers, supplier } from "../../features/supplier/suppSlice";
import Header from "../../components/UI/Header";
import CustomSpinner from "../../components/UI/CustomSpinner";
import { useNavigate } from "react-router-dom";

const initialState: MaterialInterface = {
  name: "",
  supplier_id: "",
  min_quantity: 0,
  quantity: 0,
  price: 0,
  unit_of_measure: "",
};

const AddMaterial: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status: materialStatus, message } = useSelector(material);

  useEffect(() => {
    dispatch(reset());
    dispatch(getSuppliers());
  }, [dispatch]);

  const { suppliers } = useSelector(supplier);

  const handleSubmit = (values: MaterialInterface) => {
    dispatch(createMaterial(values));
  };

  return (
    <>
      <Header title="Add Material" status={materialStatus} message={message} />
      {materialStatus === "loading" ? (
        <CustomSpinner />
      ) : (
        <Formik
          initialValues={initialState}
          validationSchema={materialValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex  flex-col justify-center mt-12 items-center ">
              <div className="w-2/4 border border-gray-300 rounded-xl p-12">
                <div className="flex justify-between">
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
                  <div className="w-2/6">
                    <div className="mb-2 block">
                      <Label htmlFor="min_quantity" value="Min Quantity*" />
                    </div>
                    <Field
                      as={TextInput}
                      color={
                        errors.min_quantity && touched.min_quantity && "failure"
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
                <div className="flex justify-between">
                  <div className="w-3/5">
                    <div className="mb-2 block">
                      <Label htmlFor="supplier_id" value="Supplier*" />
                    </div>
                    <Field
                      color={
                        errors.supplier_id && touched.supplier_id && "failure"
                      }
                      as={Select}
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
                  <div className="w-2/6">
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
                    <div className="h-7">
                      <ErrorMessage
                        name="quantity"
                        component="span"
                        className="text-[11px] text-red-600"
                      />
                    </div>
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
                    <div className="h-2">
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
                    <div className="relative">
                      <Field
                        as={TextInput}
                        color={errors.price && touched.price && "failure"}
                        id="price"
                        type="number"
                        name="price"
                        min={0}
                        max={100}
                      />
                      <div className="h-7">
                        <ErrorMessage
                          name="price"
                          component="span"
                          className=" text-red-600 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-3">
                  <Button
                    type="button"
                    onClick={() => navigate("/materials")}
                    className="px-6"
                    color="light"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="px-6" color="success">
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddMaterial;
