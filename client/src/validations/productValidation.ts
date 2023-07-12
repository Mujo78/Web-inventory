import * as Yup from "yup"

export const validationProductSchema = Yup.object({
    name: Yup.string().required("Name is required!").min(2, "Name is too short!").max(100, "Name is too long!"),
    product_process_id: Yup.string().required("Please choose the process!"),
    photo_url: Yup.string().required("Photo is required!"),
    mark_up: Yup.number().typeError("Mark up must be a number!").required("Mark up is required!"),
})