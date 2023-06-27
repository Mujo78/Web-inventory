import { Button, Label, TextInput, Toast } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Process, getProcessById, process, resetSpecificProcess } from '../../features/processes/processSlice'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { validationProcessSchema } from '../../validations/processValidation'
import {MdRecommend} from "react-icons/md"
import EditPPItems from '../../components/EditPPItems'
import { useAppDispatch } from '../../app/hooks'
import CustomSpinner from '../../components/CustomSpinner'


const EditProductProcess: React.FC = () => {
  
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {status, message, specificProcess} = useSelector(process)

  useEffect(() => {
    if(id){
      dispatch(getProcessById(id))
    }

    return () => {
      dispatch(resetSpecificProcess())
    }
  }, [dispatch, id])

  const initialState : Process = {
    _id:specificProcess?.processData?._id || '',
    name: specificProcess?.processData?.name || '',
    price: specificProcess?.processData?.price || 0,
    end_date: specificProcess?.processData?.end_date || null,
    start_date: specificProcess?.processData?.start_date ||null
  }

  const handleSubmit = () =>{
    console.log("New submit")
  }
  
  const handleCancel = () =>{
    navigate("/processes")
  }
  
  return (
    <div>
        <div className='flex justify-between items-center'>
          <h1 className='text-24 font-Rubik text-3xl mt-5 pb-7 ml-5 font-bold'>Edit product process</h1>
          <Toast className='h-2/3'>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-200 dark:bg-blue-100 dark:text-blue-200">
              <MdRecommend className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3 text-xs font-normal">
              <p> <b>Recomended</b>: Do not change the price! Price depends on product process items! </p>
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
        <hr/>
      
          {!specificProcess ? (
              <CustomSpinner />
          )
          : 
          <div>
            <Formik
              enableReinitialize={true}
              validationSchema={validationProcessSchema}
              onSubmit={handleSubmit}
              initialValues={initialState}>
                <Form>
                  <div className='flex justify-between'>
                    <div className='w-2/3 mt-4 p-8 border border-gray-300 rounded-lg'>
                      <h1 className='text-24 font-Rubik ml-3 text-xl font-bold'>Item data</h1>
                      <div className='flex mt-4 mb-5 mx-3 justify-between'>
                        <div className='flex flex-col w-3/4'>
                          <Label>Name</Label>
                          <Field
                            type="text"
                            id="name"
                            className='mt-2 mb-2 border-0 border-b'
                            name='name'
                          />
                          <ErrorMessage name='name' component="span"  className='text-red-600 text-xs' />
                        </div>
                        <div className='flex flex-col w-1/5'>
                          <Label>Price</Label>
                          <Field
                            type="number"
                            id="price"
                            className='mt-2 mb-2 border-0 border-b'
                            name='price'
                          />
                          <ErrorMessage name='price' component="span"  className='text-red-600 text-xs' />
                        </div>
                      </div>
                      <hr/>
                      <div>
                        <EditPPItems items={specificProcess?.processItems || []} />
                      </div>
                    </div>
                    <div className='w-1/3 ml-4 mt-4 p-8 border border-gray-300 rounded-lg'>
                      something
                    </div>
                  </div>
                  <div className='flex justify-end items-end mt-6'>
                    <Button onClick={handleCancel} className='mr-4' color="light"  >Cancel</Button>
                    <Button type='submit' color="success" >Save changes</Button>
                  </div>
                </Form>
            </Formik>
        </div>}
    </div>
  )
}

export default EditProductProcess
