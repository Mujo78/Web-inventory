import { Button, Label, Select, Spinner } from 'flowbite-react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { classNm } from '../LandingPage'
import { materialValidationSchema } from '../../validations/materialValidation'
import { useSelector } from 'react-redux'
import { MaterialInterface, editMaterial, getMaterial, material, resetMaterial } from '../../features/material/materialSlice'
import { useAppDispatch } from '../../app/hooks'
import { getSuppliers, supplier } from '../../features/supplier/suppSlice'
import { useNavigate, useParams } from 'react-router-dom'


const EditMaterial: React.FC = () => {
  
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    useEffect(() =>{
        if(id){
            dispatch(getMaterial(id))
        }

        return () =>{
            dispatch(resetMaterial())
        }
    }, [dispatch, id])
    
    const {suppliers} = useSelector(supplier)
    const {status, message, specificMaterial} = useSelector(material)
    
    
    const initialState : MaterialInterface = {
        name: specificMaterial?.name || '',
        supplier_id: specificMaterial?.supplier_id || '',
        min_quantity: specificMaterial?.min_quantity || 0,
        quantity: specificMaterial?.quantity || 0,
        price: specificMaterial?.price || 0,
        unit_of_measure: specificMaterial?.unit_of_measure || ''
    }

    useEffect(() =>{
        dispatch(getSuppliers())
    }, [dispatch])

    const handleEdit = (materialData: MaterialInterface) => {
        if(id){
            dispatch(editMaterial({id, materialData}))
            navigate("/materials")
        }
    }

  const goBack = () => {
    navigate("/materials")
  }
  
  return (
    <>
        <h1 className='text-24 font-Rubik text-4xl mt-9 pb-5 ml-5 font-bold'>
            Edit Material
        </h1>
        <hr/>
        {specificMaterial ? <Formik
            enableReinitialize={true}
            initialValues={initialState}
            validationSchema={materialValidationSchema}
            onSubmit={handleEdit}
            >
            <Form className="flex flex-col justify-center items-center mt-24">
                <div className='w-2/4'>
                    <div className='flex mb-6'>
                        <div className='w-6/12'>
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
                        <div className='ml-auto w-2/5'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="min_quantity"
                                    value="Min Quantity*"
                                />
                            </div>
                                <Field
                                    id="min_quantity"
                                    type="number"
                                    name="min_quantity"
                                    min={0}
                                    max={100}
                                    className={classNm}
                                />
                                <ErrorMessage name='min_quantity' component="span" className=' text-red-600 text-xs' />
                        </div>
                    </div>
                    <div className='flex mb-6'>
                        <div className='w-6/12'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="supplier_id"
                                    value="Supplier*"
                                />
                            </div>
                            <Field
                                as={Select}
                                id="supplier_id"
                                name='supplier_id'
                            >
                                <option
                                value=""
                                >
                                    Choose one option
                                </option>
                                {suppliers.length > 0 &&
                                    suppliers.map(n =>(
                                        <option
                                            key={n._id}
                                            value={n._id}>
                                            {n.name}
                                        </option>
                                    ))
                                }
                            </Field>
                                <ErrorMessage name='supplier_id' component="span" className='text-red-600 text-xs' />
                        </div>
                        <div className='ml-auto w-2/5'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="quantity"
                                    value="Quantity*"
                                />
                            </div>
                                <Field
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    min={initialState.min_quantity}
                                    max={100}
                                    className={classNm}
                                />
                                <ErrorMessage name='quantity' component="span" className=' text-red-600 text-xs' />
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-6/12'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="unit_of_measure"
                                    value="Unit*"
                                />
                            </div>
                                <Field
                                    id="unit_of_measure"
                                    placeholder="Kg"
                                    type="text"
                                    name="unit_of_measure"
                                    className={classNm}
                                />
                                <ErrorMessage name='unit_of_measure' component="span" className='text-red-600 text-xs' />
                        </div>
                        <div className='ml-auto w-2/5'>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="price"
                                    value="Price*"
                                />
                            </div>
                                <Field
                                    id="price"
                                    type="number"
                                    name="price"
                                    min={0}
                                    max={100}
                                    className={classNm}
                                />
                                <ErrorMessage name='price' component="span" className=' text-red-600 text-xs' />
                        </div>
                        {status === "failed" && <span className='text-xs text-red-600'>{message}</span>}
                    </div>
                        <div className='flex justify-end flex-wrap mt-7'>
                            <Button type="button" onClick={goBack} className='mr-5 border-green-500 ' color="light" >
                                Cancel
                            </Button>
                            <Button type="submit" className=' px-6' color="success">
                                Save changes
                            </Button>
                    </div>
                </div>
            </Form>
        </Formik> : (
            <div className='flex items-center justify-center mt-12'>
            <Spinner />
          </div>
        )}
    </>
  )
}

export default EditMaterial
