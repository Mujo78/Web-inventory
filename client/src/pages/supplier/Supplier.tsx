import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getSuppliers, supplier } from '../../features/supplier/suppSlice'
import { useAppDispatch } from '../../app/hooks'
import { Alert, Button, Card } from 'flowbite-react'
import {FiEdit} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import {GrOverview} from "react-icons/gr"

const Supplier: React.FC = () => {

  const dispatch = useAppDispatch()
  const {suppliers, status} = useSelector(supplier)
  const navigate = useNavigate()

  useEffect(() => {

    dispatch(getSuppliers())

  }, [dispatch])

  const editById = (id: string) => {
    navigate(`/edit-supplier/${id}`)
  }
  const supplierDetail = (id: string) => {
    navigate(`/supplier/${id}`)
  }
  	console.log(suppliers)
  return (
    <div className='h-4/5 scroll-smooths overflow-y-auto '>
      {status !== "failed" && suppliers.length > 0 ? (
        <div className='flex flex-wrap'>
          {suppliers.map(n => (
                <Card className='mt-2 w-full mr-2' key={n._id}>
                    <div className='flex'>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {n.name}
                </h5>
                <h5 className="text-xl ml-auto font-bold tracking-tight text-gray-900 dark:text-white">
                {n.email}
                </h5>
                <h5 className="text-xl ml-auto font-bold tracking-tight text-gray-900 dark:text-white">
                {n.pdv} %
                </h5>
                <div className="flex ml-auto ">
                  <Button onClick={() => editById(n._id)} size="sm" className='ml-auto px-0 mr-3 py-0 hover:!bg-white focus:ring-green-500 hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white'>
                      <FiEdit style={{color: "black", height: "20px"}} />
                  </Button>
                  <Button onClick={() => supplierDetail(n._id)} size="sm" className='ml-auto px-0 py-0 hover:!bg-white focus:ring-green-500 hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white'>
                      <GrOverview style={{color: "black", height: "20px"}} />
                  </Button>
                </div>
                </div>
                <div className="font-normal flex text-gray-700 dark:text-gray-400">
                    <p>
                        {`Start date: ${n.start_date?.toString().substring(0, 10)}`}
                    </p>
                    {n.end_date && 
                    <p className='text-red-500 ml-7'>
                        {`End date: ${n.end_date?.toString().substring(0, 10)}`}
                    </p>
                    }
                </div>
            </Card>
          ))}
        </div>
      ) : <div>
        <Alert color="info" className='flex items-center mt-6'>
            <h1>There are no suppliers available.</h1>
        </Alert>
        </div>}
    </div>
  )
}

export default Supplier
