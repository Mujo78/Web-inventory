import React from "react";
import { useEffect } from "react";
import { Label, Button } from "flowbite-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { userValidationSchema } from "../../validations/userValidation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { authUser, login, reset } from "../../features/auth/authSlice";
import { classNm } from "../../pages/LandingPage";
import { useNavigate } from "react-router-dom";

type User = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const initialValues: User = {
    username: "",
    password: "",
  };
  const dispatch = useAppDispatch();
  const { accessUser, status, message } = useSelector(authUser);

  useEffect(() => {
    if (accessUser || status === "idle") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }

    if (status !== "failed") {
      dispatch(reset());
    }
  }, [accessUser, status, dispatch, navigate]);

  const handleSubmit = (values: User) => {
    dispatch(login(values));
  };

  return (
    <>
      <h1 className="text-24 font-Rubik text-6xl pb-7 text-center font-bold">
        Log in
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <div className="mb-2">
                <Label htmlFor="username" value="Username*" />
              </div>
              <Field
                id="username"
                name="username"
                type="text"
                className={`${classNm} ${
                  ErrorMessage.displayName === "username" &&
                  ErrorMessage.contextTypes
                    ? "border-red-600"
                    : ""
                } `}
                placeholder="username1234"
              />
              <div className="h-4">
                <ErrorMessage
                  name="username"
                  component="span"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password*" />
              </div>
              <Field
                id="password"
                type="password"
                name="password"
                className={classNm}
                placeholder="********"
              />
              <div className="h-4">
                {errors.password ? (
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-red-600 text-sm"
                  />
                ) : (
                  status === "failed" && (
                    <span className="text-red-600 text-sm">{message}</span>
                  )
                )}
              </div>
            </div>
            <Button
              gradientMonochrome="success"
              className=" outline-none"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
