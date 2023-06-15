import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getMaterials, material } from '../features/material/materialSlice'
import { useAppDispatch } from '../app/hooks'
import { Alert, Button, Tooltip } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { addManyProcessItems } from '../features/processes/processSlice'
export interface selectedMaterials {
  product_process_id: string,
  quantity: number,
  material_id: string
}


const PPItems : React.FC<{id: string}> = ({id}) => {
  const [materialsToAdd, setMaterialsToAdd] = useState<selectedMaterials[]>([])
  
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {materials} = useSelector(material)

  useEffect(() =>{
    dispatch(getMaterials());
  }, [dispatch])


  const skipIt = () =>{
    navigate("/processes")
  }

  const addMaterialAsItem = (material_id: string) =>{
    const newItem = {
      material_id : material_id,
      product_process_id : id,
      quantity: 1
    }
    setMaterialsToAdd((n) => [...n, newItem])
  }

  const addMany = () => {
    if(materialsToAdd.length > 0 ){
      dispatch(addManyProcessItems(materialsToAdd))
    }
    navigate("/processes")
  }

  console.log(materialsToAdd)
  return (
    <>
      <div className='pb-9 ml-5 mt-12'>
        <h1 className='text-24 font-Rubik text-4xl font-bold'>
          Step 2 : Add process items
        </h1>
        <p className='text-sm font-sans text-gray-500'>You can only add as many quantity as are in stock. Hover material to see quantity of material. </p>
      </div>
      <div className='flex flex-col h-3/4 mt-3'>
        <div className='overflow-y-auto w-3/4 h-3/4 flex flex-col flex-wrap justify-start'>
          {materials.length > 0 ? (
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
        <hr/>
        <div className='flex justify-end mt-3'>
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
