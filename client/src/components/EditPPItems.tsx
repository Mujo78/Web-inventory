import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Material, getMaterials } from '../features/material/materialSlice'
import { useAppDispatch } from '../app/hooks'
import { ProductItem } from '../features/processes/processSlice'
import { Alert, Button, Tooltip } from 'flowbite-react'

const EditPPItems : React.FC<{items: ProductItem[]}> = ({items}) => {

  const dispatch = useAppDispatch()
  const [messageError, setMessageError] = useState<string>("")

   console.log(items)

  return (
    <div>
        {items ? (
          <div>
            <h1 className='text-24 font-Rubik text-xl mt-9 ml-3 font-bold'>Items</h1>
            <p className='text-xs text-gray-500 font-normal pb-5 ml-3'>Hover material name to see quantity! Click on it to change quantity!</p>
            <div>
              {items.map(n => (
                <Tooltip key={n._id} content={n.quantity}>
                <Button 
                  color="gray" 
                  className='m-2 hover:!text-green-500'
                >
                  {n.material_id.name}
                </Button>
              </Tooltip>
              ))}
            </div>
          </div>
        ) : (
          <div>

          </div>
        )}
    </div>
  )
}

export default EditPPItems
