import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMaterials, material } from '../../features/material/materialSlice'
import { useAppDispatch } from '../../app/hooks'
import { Alert, Button, Label, TextInput, Tooltip } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { addManyProcessItems } from '../../features/process/processSlice'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import CustomSpinner from '../UI/CustomSpinner'


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
    quantity: "",
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
          quantity: "1",
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
      quantity: Number(formData.quantity) > formData.material_quantity ? formData.material_quantity : Number(formData.quantity)
    }
    if(Number(newItem.quantity) !== 0){
      setMaterialsToAdd((n) => [...n, newItem])
      setShowForm(false)
    } 
  }

  return (
    <>
      <div className='pb-3 ml-5'>
        <h1 className='text-24 font-Rubik text-4xl font-bold'>
          Step 2 : Add process items
        </h1>
        <p className='text-xs mt-1 font-Rubik text-gray-500'>You can only add as many quantity as are in stock. Hover material to see quantity of material. </p>
      </div>
      <div className='flex flex-col h-5/6 ml-3 gap-8 mt-3'>
        <div className='flex h-3/6'>
          <div className='overflow-y-auto w-4/6 h-full flex flex-wrap justify-start'>
            {status === 'loading' ? 
              (
                <div className='h-full w-full flex justify-center items-center p-10'>
                  <CustomSpinner />
                </div>
              ): materials.length > 0 ? (
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
                    <div className='h-full p-10 w-full flex justify-center items-center'>
                      <Alert className='flex items-center'>
                        <h1>There are no materials available!</h1>
                      </Alert>
                    </div>
              }
          </div>
          <div className='border-l flex items-center justify-center border-gray-300 w-2/6 h-2/4'>
            {showForm && <form className=' flex flex-col items-start !h-full justify-center'>
                <AiOutlineCloseCircle className='ml-auto text-gray-400 transition-all cursor-pointer hover:scale-125 ease-out' onClick={() => setShowForm(false)}  />
                <Label htmlFor='name'>Name</Label>
                <TextInput
                  autoComplete='off'
                  id='name'
                  className='mt-2 mb-2'
                  disabled
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
                <Label htmlFor='quantity'>Quantity</Label>
                <div className='flex justify-between'>
                <TextInput
                  autoComplete='off'
                  id='quantity'
                  className='mt-2 w-3/5'
                  type='number'
                  name='quantity'
                  min={1}
                  max={formData.material_quantity}
                  value={Number(formData.quantity) > formData.material_quantity ?  formData.material_quantity : formData.quantity}
                  onChange={handleChange}
                  
                />
                <Button onClick={addMaterial} className='mt-2 ml-2' type='submit' color="success">Add</Button>
                </div>
                
              </form>}
          </div>
        </div>
        <div className='w-full h-1/6'>
            <hr/>
            <div className='flex justify-end my-3'>
              <Button color="gray" onClick={skipIt} className='mr-3 hover:!text-green-500 focus:!ring-green-500 focus:!text-green-500' >
                Skip
              </Button>
              <Button color="success" onClick={addMany}>
                Finish
              </Button>
            </div>
        </div>
      </div>
    </>
  )
}

export default PPItems
