import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getSuppliers, supplier } from '../../features/supplier/suppSlice'
import { useAppDispatch } from '../../app/hooks'
import { Button, Card } from 'flowbite-react'
import {FiEdit} from "react-icons/fi"

const Supplier = () => {

    const dispatch = useAppDispatch()
  const {suppliers, isError, message} = useSelector(supplier)

  console.log(suppliers)

  useEffect(() => {

    dispatch(getSuppliers())

  }, [dispatch])

  return (
    <div>
      {!isError && suppliers.length > 0 ? (
        <div className='flex flex-wrap'>
          {suppliers.map(n => (
                <Card className='mt-2 w-full mr-2'>
                    <p className='flex'>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {n.name}
                </h5>
                <h5 className="text-xl ml-auto font-bold tracking-tight text-gray-900 dark:text-white">
                {n.email}
                </h5>
                <h5 className="text-xl ml-auto font-bold tracking-tight text-gray-900 dark:text-white">
                {n.pdv} %
                </h5>
                <Button size="sm" className='ml-auto px-0 py-0 hover:!bg-white focus:ring-green-500 hover:transform hover:scale-125 transition-all ease-out border-x-2 bg-white'>
                    <FiEdit style={{color: "black", height: "20px"}} />
                </Button>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p>
                        {`Start date: ${n.start_date?.toString().substring(0, 10)}`}
                    </p>
                    {n.end_date && 
                    <p>
                        {`End date: ${n.end_date}`}
                    </p>
                    }
                </p>
            </Card>
          ))}
        </div>
      ) : <h1>{message}</h1>}
    </div>
  )
}

export default Supplier
