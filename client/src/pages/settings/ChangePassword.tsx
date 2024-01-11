import React, { useState } from "react";
import { IChangePassword } from "../../features/auth/authService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { changePasswordValidation } from "../../validations/userValidation";
import { Button, Label, TextInput } from "flowbite-react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { authUser, changePassword } from "../../features/auth/authSlice";
import CustomSpinner from "../../components/UI/CustomSpinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const initialValues: IChangePassword = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const { message, status } = useSelector(authUser);
  const [show, setShow] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleSubmit = (passwordsData: IChangePassword) => {
    dispatch(changePassword({ passwordsData }));
  };

  const toggle = () => {
    setShow((n) => !n);
  };

  const toggleConfirm = () => {
    setShowConfirm((n) => !n);
  };

  return (
    <>
      {status === "loading" ? (
        <CustomSpinner />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="h-[80vh]">
              <div className="flex flex-col items-start h-full w-full">
                <h1 className="font-bold text-4xl p-12">Change Password</h1>
                <div className="flex items-center justify-around h-full w-full">
                  <div>
                    <ol className="list-disc flex flex-col gap-6">
                      <li>Password MUST contain at least 7 characters</li>
                      <li>Password MUST contain at least one uppercase</li>
                      <li>
                        Password MUST contain at least one lowercase letter
                      </li>
                      <li>
                        Password MUST contain at least one special character
                      </li>
                      <li>Password MUST contain at least one number (0-9)</li>
                    </ol>
                  </div>
                  <div className="flex flex-col gap-4 md:w-2/5">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="password" value="Password*" />
                      <Field
                        as={TextInput}
                        color={
                          ((errors.oldPassword && touched.oldPassword) ||
                            status === "failed") &&
                          "failure"
                        }
                        id="password"
                        name="oldPassword"
                        placeholder="Password"
                        type="password"
                        required
                      />
                      <div className="h-4">
                        {errors.oldPassword && touched.oldPassword ? (
                          <ErrorMessage
                            name="oldPassword"
                            component="span"
                            className="text-red-600 text-sm"
                          />
                        ) : (
                          status === "failed" && (
                            <span className="text-red-600 text-sm">
                              {message}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="newPassword" value="New Password*" />
                      <div className="relative">
                        <Field
                          as={TextInput}
                          color={
                            errors.newPassword &&
                            touched.newPassword &&
                            "failure"
                          }
                          id="newPassword"
                          name="newPassword"
                          className="pr-[40px]"
                          placeholder="New Password"
                          type={show ? "text" : "password"}
                          required
                        />
                        <button
                          type="button"
                          onClick={toggle}
                          className="absolute right-2 bottom-2 top-2"
                        >
                          {show ? (
                            <FaRegEyeSlash className="h-[23px] w-[23px]" />
                          ) : (
                            <FaRegEye className="h-[23px] w-[23px]" />
                          )}
                        </button>
                      </div>

                      <div className="h-4">
                        <ErrorMessage
                          name="newPassword"
                          component="span"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label
                        htmlFor="confirmPassword"
                        value="Confirm Password*"
                      />
                      <div className="relative">
                        <Field
                          as={TextInput}
                          color={
                            errors.confirmPassword &&
                            touched.confirmPassword &&
                            "failure"
                          }
                          id="confirmPassword"
                          className="pr-[40px]"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          type={showConfirm ? "text" : "password"}
                          required
                        />
                        <button
                          className="absolute top-2 bottom-2 right-2"
                          type="button"
                          onClick={toggleConfirm}
                        >
                          {showConfirm ? (
                            <FaRegEyeSlash className="h-[23px] w-[23px]" />
                          ) : (
                            <FaRegEye className="h-[23px] w-[23px]" />
                          )}
                        </button>
                      </div>
                      <div className="h-4">
                        {errors.confirmPassword && touched.confirmPassword ? (
                          <ErrorMessage
                            name="confirmPassword"
                            component="span"
                            className="text-red-600 text-sm"
                          />
                        ) : (
                          status === "idle" && (
                            <span className="text-green-600 text-md">
                              {message}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <Button type="submit" color="success" className="px-3">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ChangePassword;
