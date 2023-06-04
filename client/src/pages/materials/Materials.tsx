import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { Material, deleteMaterialById, getMaterials, material } from '../../features/material/materialSlice'
import { Alert, Button, Card, TextInput } from 'flowbite-react'
import MaterialChart from '../../components/MaterialChart'
import {FiEdit} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import {GrOverview} from "react-icons/gr"
import { AiOutlineDelete } from 'react-icons/ai'

const Materials: React.FC = () => {

  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState<string>("")
  const [searched, setSearched] = useState<Material[]>([])
  const dispatch = useAppDispatch()
  const {materials, status, message} = useSelector(material)


  const onChange = (event : React.FormEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  useEffect(() =>{
    
    dispatch(getMaterials())
    
  }, [dispatch])

  const editMaterial = (id: string) =>{
    navigate(`/edit-material/${id}`)
  }

  const deleteMaterial = (id: string) => {
    dispatch(deleteMaterialById(id))
  }
  
  console.log(message)
  const viewMaterial = (id: string) =>{
    navigate(`/material/${id}`)
  }

  return (
    <div className='flex mt-8 max-w-full h-5/6'>
      <div className='w-2/3  h-full p-6 mb-8 border-2 rounded-md'>
        <form onSubmit={onSubmit} className="flex max-w-full flex-col">
          <div className='focus:!ring-0 flex focus:border-green-500'>
            <TextInput
              name='searchInput'
              value={searchInput}
              onChange={onChange}
              className='mb-3 w-11/12 pr-3'
              id="search-input"
              placeholder="seds"
              type="text"
            />
            <Button type="submit" color="success">
              Search
            </Button>
          </div>
        </form>

        <div className='pt-4 pb-12 h-full'>
        {materials.length > 0 ? 
            <div className= 'h-full mb-5 overflow-y-auto'>
          {materials.map(n => (
              <Card key={n._id} className='mb-3 mr-3'>
                <div className='flex justify-between'>
                  <div className='flex w-4/6'>
                    <h1>{n.name}</h1> 
                    <h1 className='mx-auto'>{n.quantity}x</h1>
                  </div>
                  <div className='flex'>
                  <Button onClick={() => editMaterial(n._id)} size="sm" className='ml-auto px-0 mr-3 py-0 hover:!bg-white focus:ring-green-500 hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white'>
                      <FiEdit style={{color: "black", height: "20px"}} />
                  </Button>
                  <Button onClick={() => viewMaterial(n._id)} size="sm" className='ml-auto px-0 py-0 hover:!bg-white focus:ring-green-500 hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white'>
                      <GrOverview style={{color: "black", height: "20px"}} />
                  </Button>
                  <Button onClick={() => deleteMaterial(n._id)} size="sm" className='ml-auto px-0 py-0 hover:!bg-white focus:ring-green-500 hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white'>
                      <AiOutlineDelete style={{color: "red", height: "20px"}} />
                  </Button>
                  </div>
                </div>
              </Card>
          ))} </div> : 
            <div>
              <Alert color="info" className='text-center flex items-center' >
                <p>There are no materials available.</p>
              </Alert>
            </div>
        }
        </div>
        </div>    
        <div className='p-4 ml-4 border-2 rounded-md w-1/3'>
          <MaterialChart />
        </div>
    </div>
  )
}

export default Materials
