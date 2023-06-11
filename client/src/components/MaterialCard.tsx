import { Button, Card } from 'flowbite-react'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { GrOverview } from 'react-icons/gr'
import { useAppDispatch } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { deleteMaterialById } from '../features/material/materialSlice'

export interface Props {
    _id: string,
    name: string,
    quantity: number
}

const classNameButton = "ml-auto px-0 py-0 hover:!bg-white focus:ring-green-500 hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white"

const MaterialCard: React.FC<Props> = ({_id, name, quantity}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const editMaterial = (id: string) =>{
        navigate(`/edit-material/${id}`)
      }
    
      const deleteMaterial = (id: string) => {
        dispatch(deleteMaterialById(id))
      }
    
      const viewMaterial = (id: string) =>{
        navigate(`/material/${id}`)
      }

  return (
    <Card key={_id} className='mb-3 mr-3'>
                <div className='flex justify-between'>
                  <div className='flex w-4/6'>
                    <h1>{name}</h1> 
                    <h1 className='mx-auto'>{quantity}x</h1>
                  </div>
                  <div className='flex'>
                  <Button onClick={() => editMaterial(_id)} size="sm" className={classNameButton}>
                      <FiEdit style={{color: "black", height: "20px"}} />
                  </Button>
                  <Button onClick={() => viewMaterial(_id)} size="sm" className={classNameButton}>
                      <GrOverview style={{color: "black", height: "20px"}} />
                  </Button>
                  <Button onClick={() => deleteMaterial(_id)} size="sm" className={classNameButton}>
                      <AiOutlineDelete style={{color: "red", height: "20px"}} />
                  </Button>
                  </div>
                </div>
              </Card>
  )
}

export default MaterialCard
