import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().required("Email is required").email(),
});
