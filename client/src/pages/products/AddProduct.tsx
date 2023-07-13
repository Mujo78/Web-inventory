import { Form, Formik, Field, ErrorMessage } from 'formik'
import React from 'react'
import { createNewProduct, product, productToCreate } from '../../features/product/productSlice'
import { validationProductSchema } from '../../validations/productValidation'
import { Button, Label, TextInput, Select, Alert, Toast } from 'flowbite-react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { getFreeProcesses } from '../../utilities/productHelpers'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import {HiX} from "react-icons/hi"

export interface stateProcessInterface {
  _id: string,
  name: string
}

const initialState = {
  name: "",
  product_process_id: "",
  mark_up: 0,
  photo_url: ""
}

const AddProduct = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {status, message} = useSelector(product) 

  const freeProcesses : stateProcessInterface[] = useLoaderData() as stateProcessInterface[]
  const handleSubmit = (values: productToCreate) =>{
    dispatch(createNewProduct(values))
  }

  const goBack = () =>{
    navigate("/products")
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
      <h1 className='text-24 font-Rubik text-4xl mt-9 pb-5 ml-5 font-bold'>
        Add Product
      </h1>
      {status === "failed" && message !== "" &&
      <Toast className='h-2/3'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          <span className='text-xs'> {message}</span>
        </div>
        <Toast.Toggle />
      </Toast>
      }

      </div>
      <hr/>

      {freeProcesses.length > 0 ? <Formik
        initialValues={initialState}
        validationSchema={validationProductSchema}
        onSubmit={(values, {resetForm}) => {
          handleSubmit(values)

          if(status === "idle") resetForm()
          if(message === "") navigate("/products")
        }}
        >
          {({errors, touched}) =>(

        <Form className='flex w-full items-center mt-12 flex-col'>
          <div className='w-2/4 border rounded-lg p-10 border-gray-300'>
          <div className='flex mt-2 justify-between mb-4'>
            <div className='w-3/5'>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  value="Product name*"
                  />
              </div>
              <Field as={TextInput}
                id="name"
                color={errors.name && touched.name && "failure"} 
                autoComplete="off"
                name="name"
                placeholder="New product"
                required
                type="text"
                />
                <ErrorMessage name='name' component="span" className='text-red-600 text-xs' />
            </div>
            <div className='w-2/6'>
              <div className="mb-2 block">
                <Label
                  htmlFor="mark_up"
                  value="Mark up* (%)"
                  />
              </div>
              <Field as={TextInput}
                color={errors.mark_up && touched.mark_up && "failure"} 
                id="mark_up"
                name="mark_up"
                required
                min={1}
                max={100}
                type="number"
                />
              <ErrorMessage name='mark_up' component="span" className='text-red-600 text-xs' />
           </div>
        </div>
        <div>
            <div className="mb-2 block">
              <Label
                htmlFor="process"
                value="Product process*"
              />
            </div>
            <Field as={Select}
              id="process"
              color={errors.product_process_id && touched.product_process_id && "failure"} 
              name="product_process_id"
              required
              >
                <option value="">
                  Choose an option
                </option>
                {freeProcesses.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}

            </Field>
            <ErrorMessage name='product_process_id' component="span" className='text-red-600 text-xs' />
          </div>
        <div>
          <div className="mb-2 mt-4 block">
            <Label
              htmlFor="photo_url"
              value="Photo URL*"
              />
          </div>
          <Field as={TextInput}
            color={errors.photo_url && touched.photo_url && "failure"} 
            id="photo_url"
            required
            name="photo_url"
            type="url"
            />
          <ErrorMessage name='photo_url' component="span" className='text-red-600 text-xs' />
        </div>
        <div className='flex mt-6 justify-end'>
          <Button onClick={goBack} color="light" className='mr-4'>
            Cancel
          </Button>
          <Button type="submit" color="success">
            Submit
          </Button>
        </div>
        </div>
          </Form>
          )}
        </Formik> : 
          <Alert className='flex mt-24 justify-center items-center'>
            <h1>You have to add process before adding new product!</h1>
          </Alert>}
    </div>
  )
}

export async function loader() {
  const freeProcesses: stateProcessInterface[] = await getFreeProcesses();

  return freeProcesses;
}

export default AddProduct
