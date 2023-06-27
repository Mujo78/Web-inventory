import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Supp } from './AddSupplier'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { editSupplier, getSupplier, resetSupplier, supplier } from '../../features/supplier/suppSlice'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { supplierValidationSchema } from '../../validations/supplierValidation'
import { Button, Label, ToggleSwitch } from 'flowbite-react'
import { classNm } from '../LandingPage'
import CustomSpinner from '../../components/CustomSpinner'

const EditSupplier: React.FC = () => {
    
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(id){
            dispatch(getSupplier(id))
        }

        return () =>{
            dispatch(resetSupplier())
        }
    }, [dispatch, id])

    const {status,specificSupplier, message} = useSelector(supplier)
    
    const [checked, setChecked] = useState<boolean>(specificSupplier?.end_date ? true : false)
    
    
    const initialState : Supp ={
        name: specificSupplier?.name || "",
        pdv: specificSupplier?.pdv || 0,
        phone_number: specificSupplier?.phone_number || "",
        contact_person: specificSupplier?.contact_person || "",
        email: specificSupplier?.email || "",
        end_date: specificSupplier?.end_date || undefined,
    }


    const handleEdit = (supplierData: Supp) =>{
        if(checked) {
            const endDate = new Date()
            supplierData.end_date = endDate;
        }

        if(id) {
            dispatch(editSupplier({id, supplierData}))
            navigate("/suppliers")
        }
        console.log("Successfully updated Supplier:" + supplierData.name)
    }

    const handleChange = () => {
        setChecked(n => !n)
    }

    const goBack = () => {
        navigate("/suppliers")
    }

  return (
    <div>
        <h1 className='text-24 font-Rubik text-4xl mt-9 pb-5 ml-5 font-bold'>
            Edit Supplier
        </h1>
        <hr/>
        {status === "loading" ? 
            <CustomSpinner />
            :  (
            <Formik
                enableReinitialize={true}
                initialValues={initialState}
                validationSchema={supplierValidationSchema}
                onSubmit={handleEdit}
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
                                    autoComplete="on"
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
                                        autoComplete="on"
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
                                        autoComplete="on"
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
                                        autoComplete="on"
                                        placeholder="First name"
                                        className={classNm}
                                    />
                                    <ErrorMessage name='contact_person' component="span" className='text-red-600 text-xs' />
                            </div>
                        </div>
                        <div className='mb-6'>
                            <div className='flex'>
                                <div className='w-3/5'>
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
                                            autoComplete="on"
                                            placeholder="something@example.com"
                                            className={classNm}
                                        />
                                        <ErrorMessage name='email' component="span" className='text-red-600 text-xs' />
                                </div>
                                <div className='ml-auto w-2/5 items-center flex justify-center'>
                                    <ToggleSwitch
                                        checked = {checked}
                                        label="End contract?"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {status === "failed" && <span className='text-xs text-red-600'>{message}</span>}
                        </div>
                        <div className='flex justify-end flex-wrap'>
                                <Button type="button" onClick={goBack} className='mr-5 border-green-500 ' color="light" >
                                    Cancel
                                </Button>
                                <Button type="submit" className=' px-6' color="success">
                                    Save changes
                                </Button>
                        </div>
                    </div>
                </Form>

            </Formik>
        )}
    </div>
  )
}

export default EditSupplier
