import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMaterials, material } from '../features/material/materialSlice'
import { useAppDispatch } from '../app/hooks'
import { Alert, Button, Label, TextInput, Tooltip } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { addManyProcessItems } from '../features/processes/processSlice'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import CustomSpinner from './CustomSpinner'


export interface selectedMaterials {
  product_process_id: string,
  quantity: number,
  material_id: string
}


const PPItems : React.FC<{id: string}> = ({id}) => {
  const [materialsToAdd, setMaterialsToAdd] = useState<selectedMaterials[]>([])
  
  const [showForm, setShowForm] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    name: "",
    material_quantity: 0,
    quantity: 1,
    material_id: ""
  })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  useEffect(() =>{
    dispatch(getMaterials());
  }, [dispatch])
  
  const {materials, status} = useSelector(material)

  const skipIt = () =>{
    navigate("/processes")
  }

  const addMaterialAsItem = (material_id: string) =>{
    
    setShowForm(true)
    const material = materials.find((m) => m._id === material_id)

    if(material) {
      setFormData((n) => ({
        ...n,
        name: material.name,
        material_quantity: material.quantity,
        quantity: material.min_quantity,
        material_id: material_id
      }))
    }
   
  }

  const addMany = () => {

    if(materialsToAdd.length > 0 ){
      dispatch(addManyProcessItems(materialsToAdd))
    }
    navigate("/processes")
  }

  const handleChange = (event : React.FormEvent<HTMLInputElement>) => {
    const {name, value} = event.currentTarget;

    setFormData ((n) =>({
      ...n,
      [name]: value
    }))

  }

  const addMaterial = (e : React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      material_id : formData.material_id,
      product_process_id : id,
      quantity: formData.quantity
    }
    setMaterialsToAdd((n) => [...n, newItem])
    setShowForm(false)
  }

  return (
    <>
      <div className='pb-9 ml-5 mt-12'>
        <h1 className='text-24 font-Rubik text-4xl font-bold'>
          Step 2 : Add process items
        </h1>
        <p className='text-sm font-sans text-gray-500'>You can only add as many quantity as are in stock. Hover material to see quantity of material. </p>
      </div>
      <div className='flex flex-col h-5/6 mt-3'>
        <div className='flex h-4/6'>
        <div className='overflow-y-auto w-4/6 h-full flex flex-col flex-wrap justify-start'>
          {status === "loading" ? 
            (
              <CustomSpinner />
            )
          : materials.length > 0 ? (
              materials.map((n) => (
                n.quantity > 0 && (
                <Tooltip key={n._id} content={n.quantity}>
                  <Button 
                    disabled={materialsToAdd.some(m => m.material_id === n._id)}
                    color="gray" 
                    onClick={() => addMaterialAsItem(n._id)} 
                    className='m-2 hover:!text-green-500'
                  >
                    {n.name}
                  </Button>
                </Tooltip>
              )))
          ) : 
            <Alert className='flex items-center'>
              <h1>There are no materials available!</h1>
            </Alert>}
        </div>
        <div className='border-l flex items-center justify-center border-gray-300 w-2/6 h-5/6'>
           {showForm && <form className='p-4 flex flex-col items-Start justify-center'>
              <AiOutlineCloseCircle className='ml-auto text-gray-400 transition-all cursor-pointer hover:scale-125 ease-out' onClick={() => setShowForm(false)}  />
              <Label>Name</Label>
              <TextInput
                className='mt-2 mb-2'
                disabled
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
              <Label className=''>Quantity</Label>
              <div className='flex justify-between'>
              <TextInput
                className='mt-2 w-3/5'
                type='number'
                name='quantity'
                min={1}
                max={formData.material_quantity}
                value={formData.quantity > formData.material_quantity ?  formData.material_quantity : formData.quantity}
                onChange={handleChange}
                
              />
              <Button onClick={addMaterial} className='mt-2' type='submit' color="success">Add</Button>
              </div>
              
            </form>}
        </div>
        </div>
        <hr/>
        <div className='flex justify-end mt-4'>
            <Button color="gray" onClick={skipIt} className='mr-3 hover:!text-green-500 focus:!ring-green-500 focus:!text-green-500' >
              Skip
            </Button>
            <Button color="success" onClick={addMany}>
              Finish
            </Button>
        </div>
      </div>
    </>
  )
}

export default PPItems
