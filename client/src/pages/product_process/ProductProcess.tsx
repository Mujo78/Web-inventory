import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProcesses, makeProcessActive, process } from '../../features/processes/processSlice'
import { useAppDispatch } from '../../app/hooks'
import { Alert, Button, Card, ToggleSwitch } from 'flowbite-react'

const ProductProcess:  React.FC = () => {

  const dispatch = useAppDispatch()
  

  const {processes, status, message} = useSelector(process)
  
  useEffect(() =>{
    dispatch(getProcesses())
  }, [dispatch])
  

  const makeActive = (id: string) =>{
    dispatch(makeProcessActive(id))
  }

  return (
    <div className='h-4/5 scroll-smooths pr-2 overflow-y-auto overflow-x-hidden '>
    {status !== "failed" && processes.length > 0 ? (
      processes.map(n => (
        <Card className='mt-2 w-full' key={n._id}>
          <div className='flex items-center'>
            <p className='p-0'>{n.name}</p>
            {n.start_date && <p className='mx-auto font-bold text-green-500'>{n.start_date.toString().slice(0, 10)}</p>}
            <ToggleSwitch label='' checked={n.start_date !== null ? true : false} onChange={() => makeActive(n._id)} className='!ml-auto first:group-focus:!bg-green-500 first:group-focus:!ring-green-500 ' />
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
