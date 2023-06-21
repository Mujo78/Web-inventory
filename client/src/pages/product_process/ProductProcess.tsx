import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProcesses, makeProcessActive, process } from '../../features/processes/processSlice'
import { useAppDispatch } from '../../app/hooks'
import { Alert, Button, Card, Spinner } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import CustomButton from '../../components/CustomButton'

const style = {
  height: "20px",
  color: "black"
}


const ProductProcess:  React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  

  useEffect(() =>{
    dispatch(getProcesses())
  }, [dispatch])
  
  
  const {processes, status, message} = useSelector(process)
  const makeActive = (id: string) =>{
    dispatch(makeProcessActive(id))
  }

  const seeMore = (id: string) =>{
    navigate(`/process/${id}`)
  }
  const editById = (id: string) => {
    navigate(`/edit-process/${id}`)
  }

  return (
    <div className='h-4/5 scroll-smooths pr-2 overflow-y-auto overflow-x-hidden '>
    {status === "loading" ? (
      <div className='flex justify-center items-center mt-12'>
        <Spinner />
      </div>
    ) :
    status !== "failed" && processes.length > 0 ? (
      processes.map(n => (
        <Card className='mt-4 w-full first:!p-0 hover:!bg-gray-100 p-0 cursor-pointer' key={n._id}>
          <div className='flex relative'>
            <div onClick={() => seeMore(n._id)} className='flex items-center justify-between w-11/12'>
              <p className='p-0'>{n.name}</p>
              {n.start_date && <p className='mx-auto font-bold text-green-500'>{n.start_date.toString().slice(0, 10)}</p>}
            </div>
            <div className='flex flex-col items-center justify-center mr-6 border-l-2 w-1/12'>
            <CustomButton onClick={() => editById(n._id)}>
              <FiEdit style={style} />
              </CustomButton>
            </div>
              <Button onClick={() => makeActive(n._id)} className={` -right-8  ${n.start_date !== null ? `hover:!bg-green-600 bg-green-500` : `hover:!bg-red-600 bg-red-500`} absolute -mt-8 `} >
                <div className='rounded-full'>

                </div>
              </Button>
          
          </div>
        </Card>
      ))
    ) : 
      <Alert color="info" className='flex items-center'>
        <h1>There are no processes available!</h1>
      </Alert>}
    </div>
  )
}

export default ProductProcess
