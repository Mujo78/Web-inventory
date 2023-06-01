import * as Yup from "yup"

export const supplierValidationSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    pdv: Yup.number().typeError("PDV must be a number!").required("PDV is required"),
    phone_number: Yup.string().matches(/^[0-9]+$/, "Phone number must contain only numbers").max(12, "Length error (max 12)").required("Phone number is required!"),
    contact_person: Yup.string().required("Contact person is required!"),
    email: Yup.string().email().typeError("Please provide valid email!").required("Email is required!"),
    end_date: Yup.date()
})