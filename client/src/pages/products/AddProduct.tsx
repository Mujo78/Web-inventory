import { Form, Formik, Field, ErrorMessage } from 'formik'
import React, { useEffect } from 'react'
import { createNewProduct, product, productToCreate, reset } from '../../features/product/productSlice'
import { validationProductSchema } from '../../validations/productValidation'
import { Button, Label, TextInput, Select, Alert } from 'flowbite-react'
import { useLoaderData } from 'react-router-dom'
import { getFreeProcesses } from '../../utilities/productHelpers'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import Header from '../../components/UI/Header'
import CustomSpinner from '../../components/UI/CustomSpinner'

export interface stateProcessInterface {
  _id: string,
  name: string
}

const initialState : productToCreate = {
  name: "",
  product_process_id: "",
  mark_up: 0,
  photo_url: ""
}

const AddProduct = () => {

  const isEditing = false
  const validationSchema = validationProductSchema(isEditing)
  const dispatch = useAppDispatch()
  const {status, message} = useSelector(product) 

  const freeProcesses : stateProcessInterface[] = useLoaderData() as stateProcessInterface[]
  useEffect(() =>{
    dispatch(reset())
  }, [dispatch])

  const handleSubmit = (values: productToCreate) => {
    dispatch(createNewProduct(values))
  }

  return (
    <>
      <Header title='Add Product' status={status} message={message} />
  
    {status === 'loading' ? <CustomSpinner /> :
      freeProcesses.length > 0 ? <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
      {({errors, touched}) =>(
        <Form className='flex w-full items-center mt-12 flex-col'>
          <div className='w-2/4 border rounded-lg p-10 border-gray-300'>
          <div className='flex mt-2 justify-between'>
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
                <div className='h-7'>
                  <ErrorMessage name='name' component="span" className='text-red-600 text-xs' />
                </div>
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
                <div className='h-7'>
                  <ErrorMessage name='mark_up' component="span" className='text-red-600 text-xs' />
                </div>
           </div>
        </div>
        <>
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
            <div className='h-7'>
              <ErrorMessage name='product_process_id' component="span" className='text-red-600 text-xs' />
            </div>
          </>
        <>
          <div className="mb-2 block">
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
            <div className='h-7'>
              <ErrorMessage name='photo_url' component="span" className='text-red-600 text-xs' />
            </div>
        </>
        <div className='flex justify-end'>
          <Button type="submit" className='w-2/6' color="success">
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
    </>
  )
}

export async function loader() {
  const freeProcesses: stateProcessInterface[] = await getFreeProcesses();

  return freeProcesses;
}

export default AddProduct
