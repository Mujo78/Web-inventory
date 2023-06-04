import { Button, Label, Toast } from 'flowbite-react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import { supplierValidationSchema } from '../../validations/supplierValidation'
import { classNm } from '../LandingPage'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { addNewSupplier, reset, supplier } from '../../features/supplier/suppSlice'

export type Supp = {
    name : string,
    pdv : number,
    phone_number : string,
    contact_person : string,
    email: string,
    end_date? : Date
}

const AddSupplier: React.FC = () => {

    const initialState : Supp = {
        name: "",
        pdv: 0,
        phone_number: "",
        contact_person: "",
        email: ""
    }

    const dispatch = useAppDispatch();
    const {status, message} = useSelector(supplier)

    const handleSubmit = (values: Supp) => {

        dispatch(addNewSupplier(values))
        dispatch(reset())
    }

  return (
    <>
        <h1 className='text-24 font-Rubik text-4xl mt-9 pb-7 text-center font-bold'>Add new Supplier</h1>
        <Formik
            initialValues={initialState}
            validationSchema={supplierValidationSchema}
            onSubmit={(values, {resetForm}) => {
                handleSubmit(values)
                if(status === "idle"){
                    resetForm()
                }
            }}
            >
            <Form className="flex flex-col justify-center items-center mt-12">
                <div className='w-3/5'>
                    <div className='flex mb-6'>
                        <div className='w-4/6'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Name*"
                                />
                            </div>
                                <Field
                                id="name"
                                name="name"
                                placeholder="Name"
                                type="text"
                                className={classNm}
                                />
                            <ErrorMessage name='name' component="span" className='text-red-600 text-xs' />
                        </div>
                        <div className='ml-auto w-1/4'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="pdv"
                                    value="PDV* (%)"
                                />
                            </div>
                                <Field
                                    id="pdv"
                                    type="number"
                                    name="pdv"
                                    min={0}
                                    max={100}
                                    className={classNm}
                                />
                                <ErrorMessage name='pdv' component="span" className=' text-red-600 text-xs' />
                        </div>
                    </div>
                    <div className='flex mb-6'>
                        <div className='w-6/12'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="phone_number"
                                    value="Phone number*"
                                />
                            </div>
                                <Field
                                    id="phone_number"
                                    placeholder="+387xx xxx xxx"
                                    type="text"
                                    name="phone_number"
                                    className={classNm}
                                />
                                <ErrorMessage name='phone_number' component="span" className='text-red-600 text-xs' />
                        </div>
                        <div className='ml-auto w-2/5'>
                            <div className="mb-2">
                                <Label
                                    htmlFor="contact_person"
                                    value="Contact person*"
                                />
                            </div>
                                <Field
                                    id="contact_person"
                                    name="contact_person"
                                    type="text"
                                    placeholder="First name"
                                    className={classNm}
                                />
                                <ErrorMessage name='contact_person' component="span" className='text-red-600 text-xs' />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email"
                                    value="Email*"
                                />
                            </div>
                                <Field
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="something@example.com"
                                    className={classNm}
                                />
                                <ErrorMessage name='email' component="span" className='text-red-600 text-xs' />
                        </div>
                        {status === "failed" && <span className='text-xs text-red-600'>{message}</span>}
                    </div>

                            <Button type="submit" className='ml-auto px-6' color="success">
                                Submit
                            </Button>
                </div>
            </Form>
        </Formik>
    </>
  )
}

export default AddSupplier