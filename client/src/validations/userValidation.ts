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
  newPassword: Yup.string()
    .required("New Password is required!")
    .min(10, "Password MUST contain at least 10 characters.")
    .matches(/[A-Z]/, "Password MUST contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password MUST contain at least one lowercase letter.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password MUST contain at least one special character."
    )
    .matches(/[0-9]/, "Password MUST contain at least one number (0-9)."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required!")
    .test("password-match-confirm", "Passwords must match", function (value) {
      return value === this.parent.newPassword;
    }),
});
