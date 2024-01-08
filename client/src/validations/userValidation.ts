import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string().required("Email is required").email(),
});

export const changePasswordValidation = Yup.object({
  oldPassword: Yup.string().required("Password is required!"),
  newPassword: Yup.string().required("New Password is required!"),
  confirmPassword: Yup.string().required("Confirm Password is required!"),
});
