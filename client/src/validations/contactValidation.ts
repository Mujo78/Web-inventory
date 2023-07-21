import * as Yup from "yup"

export const contactValidationSchema = Yup.object({
    subject: Yup.string().required("Subject is required!").max(40, 'Subject is too long!'),
    body: Yup.string().required("Body is required!")
})