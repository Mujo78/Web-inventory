import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { Material, getMaterials, material } from '../../features/material/materialSlice'
import { Alert, Button, TextInput } from 'flowbite-react'
import MaterialChart from '../../components/Materials/MaterialChart'
import { useNavigate } from 'react-router-dom'
import MaterialCard from '../../components/Materials/MaterialCard'
import axios from 'axios'
import CustomSpinner from '../../components/UI/CustomSpinner'
import useSelectedPage from '../../hooks/useSelectedPage'
import  {AiOutlinePlus} from "react-icons/ai"
import CustomButton from '../../components/UI/CustomButton'
import { Tooltip as ToolTp } from 'flowbite-react'

interface materialsQuantity {
  name: string,
  quantity: number
}

interface supplierMaterial {
  supplier: string,
  materialsCount: number
}

export interface SupplierWithMaterialAndQuantity {
  materialsQuantity: materialsQuantity[],
  supplierMaterialCounts: supplierMaterial[]
}

const Materials: React.FC = () => {
  
  const [suppMatt, setSuppMatt] = useState<SupplierWithMaterialAndQuantity>();

  useSelectedPage("Materials")
  
  const getSupplierMaterials = async () => {
    const res = await axios.get("/supplier-materials")
    const data = res.data

    setSuppMatt(data)
  }

  
  const dispatch = useAppDispatch()
  
  useEffect(() =>{
    dispatch(getMaterials())
  }, [dispatch])

  const {materials, status} = useSelector(material)
  
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
    <div className='flex relative w-full h-[89vh] overflow-y-hidden '>
      <div className=' flex w-full h-full'>
        <div className='w-2/4 p-6 h-full overflow-y-hidden rounded-md'>
          <form onSubmit={onSubmit} className="flex flex-col">
            <div className='focus:!ring-0 flex focus:border-green-500'>
              <TextInput
                name='searchInput'
                value={searchInput}
                onChange={onChange}
                className='mb-3 w-full pr-3'
                id="search-input"
                placeholder="Material One"
                type="text"
              />
              <Button type="submit" color="success">
                Search
              </Button>
            </div>
          </form>

          <div className='pt-4 pb-12 h-full w-full'>
            <div id='content' className= 'h-full overflow-y-auto overflow-x-hidden pr-2 w-full'>
              {status === "loading" ? (
                <CustomSpinner size='md' />
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
          {suppMatt && 
            <div className='ml-5 h-full w-2/4'>
              <MaterialChart suppMatt={suppMatt} />
          </div>}
      </div>
        <CustomButton v={1} onClick={() => navigate("/add-material")} className='bg-white absolute right-10 bottom-10 !w-[81px] !h-[81px] focus:ring-gray-50 shadow-xl hover:bg-gray-50 ring-2 ring-gray-100 hover:focus:ring-gray-100 flex justify-center items-center hover:transition-all hover:duration-300 !rounded-full'>
      <ToolTp content="Add new material" className='text-xs w-[140px] h-[50px] text-center flex justify-center items-center'>
          <AiOutlinePlus style={{color: "green", width: 30, height: 30, fontWeight: 'bold'}} />
      </ToolTp>
        </CustomButton>
    </div>
  )
}

export default Materials
