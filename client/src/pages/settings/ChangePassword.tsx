import React from "react";
import { IChangePassword } from "../../features/auth/authService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { changePasswordValidation } from "../../validations/userValidation";
import { Button, Label, TextInput } from "flowbite-react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { authUser, changePassword } from "../../features/auth/authSlice";
import CustomSpinner from "../../components/UI/CustomSpinner";

const initialValues: IChangePassword = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const { message, status } = useSelector(authUser);

  const handleSubmit = (passwordsData: IChangePassword, { resetForm }: any) => {
    dispatch(changePassword({ passwordsData }));
    resetForm();
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
                    <ol className="list-disc">
                      <li>Something</li>
                      <li>Something</li>
                      <li>Something</li>
                      <li>Something</li>
                      <li>Something</li>
                    </ol>
                    <span>{message}</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="password" value="Password*" />
                      <Field
                        as={TextInput}
                        color={
                          errors.oldPassword && touched.oldPassword && "failure"
                        }
                        id="password"
                        name="oldPassword"
                        placeholder="Password"
                        type="password"
                        required
                      />
                      <div className="h-4">
                        <ErrorMessage
                          name="oldPassword"
                          component="span"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="newPassword" value="New Password*" />
                      <Field
                        as={TextInput}
                        color={
                          errors.newPassword && touched.newPassword && "failure"
                        }
                        id="newPassword"
                        name="newPassword"
                        placeholder="New Password"
                        type="password"
                        required
                      />
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
                      <Field
                        as={TextInput}
                        color={
                          errors.confirmPassword &&
                          touched.confirmPassword &&
                          "failure"
                        }
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        required
                      />
                      <div className="h-4">
                        <ErrorMessage
                          name="confirmPassword"
                          component="span"
                          className="text-red-600 text-sm"
                        />
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
