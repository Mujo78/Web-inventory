import * as Yup from "yup"

export const validationProcessSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    price: Yup.number().required("Price is required")
})