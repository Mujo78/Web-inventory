import { Button, Label, TextInput } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { supplierValidationSchema } from "../../validations/supplierValidation";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import {
  addNewSupplier,
  reset,
  supplier,
} from "../../features/supplier/suppSlice";
import Header from "../../components/UI/Header";
import CustomSpinner from "../../components/UI/CustomSpinner";
import { useNavigate } from "react-router-dom";

export type Supp = {
  name: string;
  pdv: number;
  phone_number: string;
  contact_person: string;
  email: string;
  end_date?: Date;
};

const initialState: Supp = {
  name: "",
  pdv: 0,
  phone_number: "",
  contact_person: "",
  email: "",
};

const AddSupplier: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, message } = useSelector(supplier);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleSubmit = (values: Supp) => {
    dispatch(addNewSupplier(values));
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header title="Add new Supplier" status={status} message={message} />
      {status === "loading" ? (
        <CustomSpinner />
      ) : (
        <Formik
          initialValues={initialState}
          validationSchema={supplierValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-center items-center mt-8">
              <div className="w-3/5 border border-gray-300 rounded-lg p-10">
                <div className="flex">
                  <div className="w-4/6">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Name*" />
                    </div>
                    <Field
                      as={TextInput}
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      color={errors.name && touched.name && "failure"}
                    />
                    <div className="h-7">
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>
                  <div className="ml-auto w-1/4">
                    <div className="mb-2 block">
                      <Label htmlFor="pdv" value="PDV* (%)" />
                    </div>
                    <Field
                      as={TextInput}
                      id="pdv"
                      type="number"
                      name="pdv"
                      min={0}
                      max={100}
                      color={errors.pdv && touched.pdv && "failure"}
                    />
                    <div className="h-7">
                      <ErrorMessage
                        name="pdv"
                        component="span"
                        className=" text-red-600 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-6/12">
                    <div className="mb-2 block">
                      <Label htmlFor="phone_number" value="Phone number*" />
                    </div>
                    <Field
                      as={TextInput}
                      id="phone_number"
                      placeholder="+387xx xxx xxx"
                      type="text"
                      name="phone_number"
                      color={
                        errors.phone_number && touched.phone_number && "failure"
                      }
                    />
                    <div className="h-7">
                      <ErrorMessage
                        name="phone_number"
                        component="span"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>
                  <div className="ml-auto w-2/5">
                    <div className="mb-2">
                      <Label htmlFor="contact_person" value="Contact person*" />
                    </div>
                    <Field
                      as={TextInput}
                      id="contact_person"
                      name="contact_person"
                      type="text"
                      placeholder="First name"
                      color={
                        errors.contact_person &&
                        touched.contact_person &&
                        "failure"
                      }
                    />
                    <div className="h-7">
                      <ErrorMessage
                        name="contact_person"
                        component="span"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email*" />
                    </div>
                    <Field
                      as={TextInput}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="something@example.com"
                      color={errors.email && touched.email && "failure"}
                    />
                    <div className="h-7">
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="text-red-600 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex mt-3">
                  <Button color="light" onClick={goBack}>
                    Cancel
                  </Button>
                  <Button type="submit" className="ml-auto" color="success">
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

export default AddSupplier;
