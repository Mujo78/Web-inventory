import { Accordion, Alert, Button, Label, Toast } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addManyProcessItems, deactivateProcess, editSpecificProcess, getProcessById, makeProcessActive, makeProcessUsable, process, resetSpecificProcess } from '../../features/process/processSlice'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { validationProcessSchema } from '../../validations/processValidation'
import {MdRecommend} from "react-icons/md"
import EditPPItems from '../../components/EditPPItems'
import { useAppDispatch } from '../../app/hooks'
import CustomSpinner from '../../components/CustomSpinner'
import { ProcessToEdit } from '../../features/process/processService'
import axios from 'axios'
import ProcessItemsToAdd from '../../components/ProcessItemsToAdd'
import { selectedMaterials } from '../../components/PPItems'

export interface MaterialToAdd {
  _id: string,
  name: string, 
  quantity: number
}

const EditProductProcess: React.FC = () => {
  
  const {id} = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {status, message, specificProcess} = useSelector(process)
  const [materialsToAdd , setMaterialsToAdd] = useState<MaterialToAdd[]>([])
  const [materialsItems, setMaterialsItems] = useState<selectedMaterials[]>([])

  const getMaterialsToAdd = async () => {
    try{
      const res = await axios.get(`/process/${id}`)
      const data = res.data

      setMaterialsToAdd(data)
    }catch(err: any){
      console.log(err)
    }
  }

  useEffect(() => {
    if(id){
      dispatch(getProcessById(id))
      getMaterialsToAdd()
    }
    return () => {
      dispatch(resetSpecificProcess())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id])

  const initialState : ProcessToEdit = {
    name: specificProcess?.processData?.name || '',
    price: specificProcess?.processData?.price || 0
  }

  const handleSubmit = (processData: ProcessToEdit) =>{
    if(id){
      dispatch(editSpecificProcess({id, processData}))
      if(message === "") navigate("/processes")
    }
  }
  
  const handleCancel = () =>{
    navigate("/processes")
  }

  const makeActive = (id: string) =>{
    dispatch(makeProcessActive(id))
    navigate("/processes")
  }

  const makeProcessUsableAgain = (id: string) => {
    dispatch(makeProcessUsable(id))
    navigate("/processes")
  }

  const makeDeactive = (id: string) => {
    dispatch(deactivateProcess(id))
    navigate("/processes")
  }

  const saveChanges = () => {
    if(materialsItems.length > 0) {
      dispatch(addManyProcessItems(materialsItems))
    }
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
        ) :
        <div>
          <div className='flex h-3/4 justify-between'>
            <div className='w-2/3 mt-4 p-8 border border-gray-300 rounded-lg'>
              <Formik
                enableReinitialize={true}
                validationSchema={validationProcessSchema}
                onSubmit={handleSubmit}
                initialValues={initialState}>
                <Form>
                    <h1 className='text-24 font-Rubik ml-3 text-xl font-bold'>Process data</h1>
                    <div className='flex mt-4 mx-3 justify-between'>
                        <div className='flex flex-col w-3/4'>
                          <Label htmlFor='name'>Name</Label>
                          <Field
                            autoComplete="off"
                            type="text"
                            id="name"
                            className='mt-2 mb-2 border-0 border-b'
                            name='name'
                          />
                          {status === "failed" && <span className='text-red-600 text-xs'>{message}</span>}
                          <ErrorMessage name='name' component="span"  className='text-red-600 text-xs' />
                        </div>
                        <div className='flex flex-col w-1/5'>
                          <Label htmlFor='price'>Price</Label>
                          <Field
                            type="number"
                            id="price"
                            className='mt-2 border-0 border-b'
                            name='price'
                          />
                          <ErrorMessage name='price' component="span"  className='text-red-600 text-xs' />
                        </div>
                    </div>
                    <Button size="xs" type='submit' className='ml-auto mt-4 mb-4' color="success" >Save changes</Button>
                </Form>
              </Formik>
              <hr/>
              <div>
                <EditPPItems items={specificProcess?.processItems || []} />
              </div>
            </div>
              <Accordion className='w-1/3 h-2/4 ml-4 mt-4 p-4 border border-gray-300 rounded-lg'>
                <Accordion.Panel>
                  <Accordion.Title>
                    Add new Items
                  </Accordion.Title>
                  <Accordion.Content>
                    {materialsToAdd.length > 0 ?
                      <div className='h-3/4'>
                        <p className='text-xs text-gray-500 font-normal pb-5'>Name (quantity) - quantity to add </p>
                          <ul className="divide-y overflow-y-auto h-full p-0 divide-gray-300">
                            {materialsToAdd.map((n) =>
                              <ProcessItemsToAdd item={n} process_id={id ? id : ""} key={n._id} setMaterialsItems={setMaterialsItems} materialsItems={materialsItems}/> 
                              )}
                          </ul>
                      </div>
                      : <Alert><h1>There are no materials to add to this process!</h1></Alert>  
                    }
                  </Accordion.Content>
              
                </Accordion.Panel>
              </Accordion>
            </div>
            <div className='flex h-1/4 justify-between items-end'>
              <div className='flex justify-end align-bottom items-end mt-6'>
                <Button onClick={handleCancel} className='mr-4' color="light"  >Cancel</Button>
              </div>
              <div className='flex justify-end align-bottom items-end mt-6'>
                { specificProcess?.processData.end_date !== null && 
                  specificProcess?.processData.start_date !== null && 
                  <Button color="gray" className='mr-4' onClick={() => makeProcessUsableAgain(specificProcess.processData._id)} >Use process again</Button>}
                
                {((specificProcess?.processData.start_date !== null && specificProcess?.processData.end_date === null) || 
                (specificProcess?.processData.start_date === null && specificProcess?.processData.end_date === null)) &&
                  <Button className='mr-4' onClick={() => makeDeactive(specificProcess.processData._id)} color="failure">Deactivate process</Button>}
                
                {specificProcess?.processData.end_date === null && 
                  specificProcess?.processData.start_date === null && 
                  <Button color="success" className='mr-4' onClick={() => makeActive(specificProcess.processData._id)} >Activate process</Button>}

                  <Button color="success" outline onClick={() => saveChanges()} >Save changes</Button>
              </div>
            </div>
        </div>}
    </div>
  )
}

export default EditProductProcess