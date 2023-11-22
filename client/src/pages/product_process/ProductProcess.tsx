import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Process, getProcesses, process } from '../../features/process/processSlice'
import { useAppDispatch } from '../../app/hooks'
import { Alert, Button, TextInput } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import CustomSpinner from '../../components/UI/CustomSpinner'
import useSelectedPage from '../../hooks/useSelectedPage'
import CurrentActiveProcess from '../../components/ProductProcess/CurrentActiveProcess'
import ProductProcessChart from '../../components/ProductProcess/ProductProcessChart'
import IconButton from '../../components/UI/IconButton'
import ProcessCard from '../../components/ProductProcess/ProcessCard'

const ProductProcess:  React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState<string>();
  const [searched, setSearched] = useState<Process[]>();

  useSelectedPage("Product Processes")

  useEffect(() =>{
    dispatch(getProcesses())
  }, [dispatch])  
  
  const {processInfo, status} = useSelector(process)
  const [currentActiveProcess, setCurrentActiveProcess] = useState<string | undefined>()

  useEffect(() => {
    if(processInfo){
      setCurrentActiveProcess(processInfo?.processes?.find((p) => p.start_date !== null && p.end_date === null)?._id);
    }
  }, [processInfo])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;

    setSearchInput(value);
  }

  useEffect(() => {
    if(searchInput){
      const searchedProcesses = processInfo.processes.filter((p) => p.name.toLowerCase() === searchInput.toLowerCase() || p.name.includes(searchInput))
      setSearched(searchedProcesses)
    }
  }, [processInfo.processes, searchInput])

  return (
    <div className='h-[89vh] w-full flex relative'>
      <div className='h-full pr-2 w-3/5 pb-12 overflow-hidden '>
        <form className='flex gap-2 p-3 w-full'>
          <TextInput 
            className='flex-grow'
            name='searchInput'
            value={searchInput}
            placeholder='New material'
            onChange={(e) => onChange(e)}
          />
          <Button color='success'>
            Search
          </Button>
        </form>
        <div id='content' className='p-3 scroll-smooths h-full scroll-p-0 overflow-y-scroll'>
          {status === "loading" ? (
            <CustomSpinner />
          ) :
          status !== "failed" ? (
            searchInput && searched && searched?.length > 0 ? 
            searched.map(m => (
              !(m.start_date !== null && m.end_date === null) &&
              <ProcessCard process={m} />
            )) :
            processInfo?.processes?.length > 0 ?
              processInfo.processes.map(n => (
                !(n.start_date !== null && n.end_date === null) &&
                <ProcessCard process={n} />
              ))
              :
              <Alert color="info" className='flex items-center'>
              <h1>There are no processes available!</h1>
            </Alert>
            ): 
            <Alert color="info" className='flex items-center'>
              <h1>There are no processes available!</h1>
            </Alert>
          }
        </div>
      </div>
      <div className='h-full pl-3 w-2/5 flex flex-col justify-center gap-4'>
        <CurrentActiveProcess activeId={currentActiveProcess} />
        <ProductProcessChart />
      </div>
      <IconButton onClick={() => navigate('/add-process')} className='absolute right-10 !shadow-2xl border-2 !border-gray-100 bottom-10'>
        <AiOutlinePlus style={{color: "green", width: 30, height: 30, fontWeight: 'bold'}} />
      </IconButton>
    </div>
  )
}

export default ProductProcess
