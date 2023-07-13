import * as Yup from "yup"

export const materialValidationSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    min_quantity: Yup.number().typeError("Min quantity must be a number!").required("Min quantity is required"),
    quantity: Yup.number().typeError("Quantity must be a number!").required("Quantity is required").min(Yup.ref('min_quantity'), "Quantity is smaller than min quantity!"),
    price: Yup.number().typeError("Price must be a number!").required("Price is required"),
    unit_of_measure: Yup.string().required("Unit of measure is required!").max(5, "Length error (max 5)!"),
    supplier_id: Yup.string().required("Supplier is required!")
})