import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Supp } from "./AddSupplier";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import {
  editSupplier,
  getSupplier,
  resetSupplier,
  supplier,
} from "../../features/supplier/suppSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { supplierValidationSchema } from "../../validations/supplierValidation";
import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import CustomSpinner from "../../components/UI/CustomSpinner";

type Props = {
  id: string;
};

const EditSupplier: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSupplier(id));
    }

    return () => {
      dispatch(resetSupplier());
    };
  }, [dispatch, id]);

  const { status, specificSupplier, message } = useSelector(supplier);

  const [checked, setChecked] = useState<boolean>(
    specificSupplier?.end_date ? true : false
  );

  const initialState: Supp = {
    name: specificSupplier?.name || "",
    pdv: specificSupplier?.pdv || 0,
    phone_number: specificSupplier?.phone_number || "",
    contact_person: specificSupplier?.contact_person || "",
    email: specificSupplier?.email || "",
    end_date: specificSupplier?.end_date || undefined,
  };

  const handleEdit = (supplierData: Supp) => {
    if (checked) {
      const endDate = new Date();
      supplierData.end_date = endDate;
    }

    if (id) {
      dispatch(editSupplier({ id, supplierData })).then((action) => {
        if (typeof action.payload === "object") navigate("/suppliers");
      });
    }
  };

  const handleChange = () => {
    setChecked((n) => !n);
  };

  return (
    <div className="mt-12">
      {!specificSupplier ? (
        <CustomSpinner />
      ) : (
        <Formik
          enableReinitialize={true}
          initialValues={initialState}
          validationSchema={supplierValidationSchema}
          onSubmit={handleEdit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col px-6 mt-4 w-full justify-center">
              <>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name*" />
                </div>
                <Field
                  as={TextInput}
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  autoComplete="on"
                  color={errors.name && touched.name && "failure"}
                />
                <div className="h-6">
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
              </>
              <>
                <div className="mb-2 block">
                  <Label htmlFor="pdv" value="PDV* (%)" />
                </div>
                <Field
                  as={TextInput}
                  id="pdv"
                  type="number"
                  name="pdv"
                  autoComplete="on"
                  min={0}
                  max={100}
                  color={errors.pdv && touched.pdv && "failure"}
                />
                <div className="h-6">
                  <ErrorMessage
                    name="pdv"
                    component="span"
                    className=" text-red-600 text-xs"
                  />
                </div>
              </>
              <>
                <div className="mb-2 block">
                  <Label htmlFor="phone_number" value="Phone number*" />
                </div>
                <Field
                  as={TextInput}
                  id="phone_number"
                  placeholder="+387xx xxx xxx"
                  type="text"
                  autoComplete="on"
                  name="phone_number"
                  color={
                    errors.phone_number && touched.phone_number && "failure"
                  }
                />
                <div className="h-6">
                  <ErrorMessage
                    name="phone_number"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
              </>
              <>
                <div className="mb-2">
                  <Label htmlFor="contact_person" value="Contact person*" />
                </div>
                <Field
                  as={TextInput}
                  id="contact_person"
                  name="contact_person"
                  type="text"
                  autoComplete="on"
                  placeholder="First name"
                  color={
                    errors.contact_person && touched.contact_person && "failure"
                  }
                />
                <div className="h-6">
                  <ErrorMessage
                    name="contact_person"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
              </>
              <>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email*" />
                </div>
                <Field
                  as={TextInput}
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="on"
                  placeholder="something@example.com"
                  color={errors.email && touched.email && "failure"}
                />
                <div className="h-6">
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-red-600 text-xs"
                  />
                </div>
              </>
              <>
                <ToggleSwitch
                  className="ml-auto"
                  checked={checked}
                  label="End contract?"
                  onChange={handleChange}
                />
              </>
              <div className="h-9">
                {status === "failed" && (
                  <span className="text-xs text-red-600">{message}</span>
                )}
              </div>
              <Button type="submit" className="w-full" color="success">
                Save changes
              </Button>
            </Form>
          )}
        </Formik>
      )}

      {!specificSupplier && status === "failed" && (
        <span>There was an error, please try again latter</span>
      )}
    </div>
  );
};

export default EditSupplier;
