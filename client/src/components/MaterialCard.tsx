import { Card } from 'flowbite-react'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { GrOverview } from 'react-icons/gr'
import { useAppDispatch } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { deleteMaterialById } from '../features/material/materialSlice'
import CustomButton from './CustomButton'

export interface Props {
    _id: string,
    name: string,
    quantity: number

}

const style = {
  height: "20px",
  color: "black"
}

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
                  <CustomButton onClick={() => viewMaterial(_id)}>
                      <GrOverview style={style} />
                  </CustomButton>
                  <CustomButton onClick={() => editMaterial(_id)}>
                      <FiEdit style={style} />
                  </CustomButton>
                  <CustomButton onClick={() => deleteMaterial(_id)}>
                      <AiOutlineDelete style={{color: "red", height: "20px"}} />
                  </CustomButton>
                  </div>
                </div>
              </Card>
  )
}

export default MaterialCard
