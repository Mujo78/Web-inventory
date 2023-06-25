import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { Material, getMaterials, material } from '../../features/material/materialSlice'
import { Alert, Button, Spinner, TextInput } from 'flowbite-react'
import MaterialChart from '../../components/MaterialChart'
import { useNavigate } from 'react-router-dom'
import MaterialCard from '../../components/MaterialCard'
import axios from 'axios'


export interface SupplierWithMaterial {
  supplier: string,
  materialsCount: number
}

const Materials: React.FC = () => {
  
  const [suppMatt, setSuppMatt] = useState<SupplierWithMaterial[]>([]);
  
  const getSupplierMaterials = async () => {
    const res = await axios.get("/supplier-materials")
    const data = res.data

    setSuppMatt(data)
  }

  
  const dispatch = useAppDispatch()
  
  useEffect(() =>{
    dispatch(getMaterials())
  }, [dispatch])

  const {materials, status, message} = useSelector(material)
  
  useEffect(() => {
    getSupplierMaterials()
  }, [materials])

  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState<string>("")
  const [searched, setSearched] = useState<Material[]>([])


  const onChange = (event : React.FormEvent<HTMLInputElement>) => {
    setSearchInput(event.currentTarget.value)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setSearched(materials.filter(n => n.name === searchInput || n.name.startsWith(searchInput.slice(0,3))))
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
              placeholder="Material One"
              type="text"
            />
            <Button type="submit" color="success">
              Search
            </Button>
          </div>
        </form>

        <div className='pt-4 pb-12 h-full'>
          <div className= 'h-full mb-5 overflow-y-auto'>
          {status === "loading" ? (
            <div className='flex items-center justify-center mt-12'>
              <Spinner />
            </div>
          ) :
          materials.length > 0 ?
            searchInput ?
              searched.length > 0 ? 
                searched.map( n => (
                    <MaterialCard key={n._id} _id={n._id} name={n.name} quantity={n.quantity} />
                )) : 
                <div>
                  <Alert color="info" className='text-center flex items-center' >
                    <p>There are no such materials available.</p>
                  </Alert>
                </div> 
            :
              materials.map(m => (
                  <MaterialCard key={m._id} _id={m._id} name={m.name} quantity={m.quantity} />
              )) 
            :
            <div>
                <Alert color="info" className='text-center flex items-center' >
                  <p>There are no materials available.</p>
                </Alert>
            </div> 
        }
        </div>
        </div>
        </div>   
        {suppMatt.length > 0 && <div className='p-4 ml-4 border-2 rounded-md w-1/3'>
          <MaterialChart suppMatt={suppMatt} />
        </div>}
    </div>
  )
}

export default Materials
