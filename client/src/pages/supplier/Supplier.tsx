import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getSuppliers, supplier } from '../../features/supplier/suppSlice'
import { useAppDispatch } from '../../app/hooks'
import { Alert, Card } from 'flowbite-react'
import {FiEdit} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import {GrOverview} from "react-icons/gr"
import CustomButton from '../../components/CustomButton'
import CustomSpinner from '../../components/CustomSpinner'

const styles = {
  height: "20px",
  color: "black"
}

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

  return (
    <div className='h-4/5 scroll-smooths overflow-y-auto '>
      { status === "loading" ? (
        <CustomSpinner />
      ) :
      status !== "failed" && suppliers.length > 0 ? (
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
                  <CustomButton onClick={() => editById(n._id)} v={1}>
                      <FiEdit style={styles} />
                  </CustomButton>
                  <CustomButton onClick={() => supplierDetail(n._id)} v={1}>
                      <GrOverview style={styles} />
                  </CustomButton>
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
