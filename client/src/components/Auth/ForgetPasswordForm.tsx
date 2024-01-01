import React from "react";
import { Label, Button } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { forgotPasswordValidation } from "../../validations/userValidation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { authUser, login, reset } from "../../features/auth/authSlice";
import { classNm } from "../../pages/LandingPage";

type User = {
  username: string;
  password: string;
};
const ForgetPasswordForm = () => {
  const initialValues: User = {
    username: "",
    password: "",
  };
  const dispatch = useAppDispatch();
  const { accessUser, status } = useSelector(authUser);

  const handleSubmit = (values: User) => {
    dispatch(login(values));
  };

  return (
    <>
      <h1 className="text-24 font-Rubik text-6xl pb-7 text-center font-bold">
        Forgot password
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordValidation}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <div>
            <div className="mb-2">
              <Label htmlFor="email" value="Email" />
            </div>
            <Field
              id="email"
              name="email"
              type="email"
              className={`${classNm} ${
                ErrorMessage.displayName === "email" &&
                ErrorMessage.contextTypes
                  ? "border-red-600"
                  : ""
              } `}
              placeholder="email@example.com"
            />
            <div className="h-4">
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-600 text-sm"
              />
            </div>
          </div>
          <div>
            {status === "failed" && (
              <span className="text-red-600">Email is incorrect!</span>
            )}
          </div>
          <Button
            gradientMonochrome="success"
            className=" outline-none"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default ForgetPasswordForm;
