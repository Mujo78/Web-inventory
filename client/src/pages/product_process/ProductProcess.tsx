import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { deactivateProcess, getProcesses, makeProcessActive, process, resetCurrentProcess } from '../../features/process/processSlice'
import { useAppDispatch } from '../../app/hooks'
import { Alert, Button, Card, CustomFlowbiteTheme} from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import {AiOutlinePlus} from 'react-icons/ai'
import CustomButton from '../../components/UI/CustomButton'
import { MdDisabledByDefault } from 'react-icons/md'
import CustomSpinner from '../../components/UI/CustomSpinner'
import useSelectedPage from '../../hooks/useSelectedPage'
import CurrentActiveProcess from '../../components/ProductProcess/CurrentActiveProcess'
import ProductProcessChart from '../../components/ProductProcess/ProductProcessChart'
import IconButton from '../../components/UI/IconButton'
import ProcessModal from '../../components/ProductProcess/ProcessModal'
import { getDate } from '../../helpers/ProductProcessSideFunc'

const customTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children: "flex h-full flex-col justify-center gap-4 !p-0"
  }
}


const style = {
  height: "20px",
  color: "white"
}

const ProductProcess:  React.FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useSelectedPage("Product Processes")

  useEffect(() =>{
    dispatch(getProcesses())
  }, [dispatch])  
  
  const [show, setShow] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>();
  const {processInfo, status, message} = useSelector(process)
  const [currentActiveProcess, setCurrentActiveProcess] = useState<string | undefined>()

  const makeActive = (event: React.FormEvent, id: string) =>{
    event.stopPropagation()
    dispatch(resetCurrentProcess())
    dispatch(makeProcessActive(id))
  }

  const seeMore = (id: string) =>{
    setActiveId(id)
    setShow(true);
  }
  const editById = (event: React.FormEvent, id: string) => {
    event.stopPropagation()
    navigate(`/edit-process/${id}`)
  }

  const makeDeactive = (event: React.FormEvent, id: string) => {
    event.stopPropagation()
    dispatch(deactivateProcess(id))
  }

  useEffect(() => {
    if(processInfo){
      setCurrentActiveProcess(processInfo?.processes?.find((p) => p.start_date !== null && p.end_date === null)?._id);
    }
  }, [processInfo])

  return (
    <div className='h-[89vh] w-full flex relative'>
      <div className='h-full pr-2 w-3/5 pb-2 overflow-hidden '>
        <div id='content' className='p-3 scroll-smooths h-full scroll-p-0 overflow-y-scroll'>
          {status === "loading" ? (
            <CustomSpinner />
          ) :
          status !== "failed" && processInfo?.processes?.length > 0 ? (
            processInfo.processes.map(n => (
              !(n.start_date !== null && n.end_date === null) &&
              <Card theme={customTheme} onClick={() => seeMore(n._id)} className={`mb-4 w-full hover:!bg-gray-100 p-0 cursor-pointer ${activeId === n._id && 'bg-green-100'}`} key={n._id}>
                <div className='flex relative'>
                  <div className='flex items-center p-6 w-11/12'>
                    <p className='p-0'>{n.name}</p>
                    {n.start_date && n.end_date ? (
                      <div className='flex flex-col mx-auto text-xs'>
                        <p className='mx-auto font-semi-bold text-green-500'>{getDate(n.start_date)}</p>
                        <p className='mx-auto font-semi-bold text-red-500'>{getDate(n.start_date)}</p>
                      </div>
                    ) :
                      n.end_date ? <p className='mx-auto text-xs font-semi-bold text-red-500'>{getDate(n.end_date)}</p> : <p></p>
                    }
                    
                  </div>
                  <div className={`flex items-center ${n.start_date && n.end_date && "mr-3"} border-l-2 w-fit`}>
                  
                    <CustomButton className='h-full ml-auto rounded-none bg-gray-300 hover:!bg-gray-400' onClick={(e) => editById(e, n._id)} v={1}>
                      <FiEdit style={style} />
                      </CustomButton>
                      {n.start_date && n.end_date ? "" :  <CustomButton className='h-full bg-red-600 rounded-none hover:!bg-red-700' onClick={(e) => makeDeactive(e, n._id)} v={2}>
                        <MdDisabledByDefault style={style} />
                      </CustomButton>}
                  </div>
                  
                  {n.start_date && n.end_date ? "" : 
                  <div>
                    <Button onClick={(e) => makeActive(e, n._id)} className='hover:!bg-red-600 bg-red-500 ml-3 rounded-r-lg h-full rounded-none' >
                      <div className='h-full text-sm flex justify-center items-center flex-grow-0'>
                        <p className='text-[9px]'>MA</p>
                      </div>
                    </Button>
                  </div>
                  }
                </div>
              </Card>
            ))
            ) : 
            <Alert color="info" className='flex items-center'>
              <h1>There are no processes available!</h1>
            </Alert>}
        </div>
      </div>
      <div className='h-full pl-3 w-2/5 flex flex-col justify-center gap-4'>
        <CurrentActiveProcess activeId={currentActiveProcess} />
        <ProductProcessChart />
      </div>
      <IconButton onClick={() => navigate('/add-process')} className='absolute right-10 !shadow-2xl border-2 !border-gray-100 bottom-10'>
        <AiOutlinePlus style={{color: "green", width: 30, height: 30, fontWeight: 'bold'}} />
      </IconButton>
      {show && <ProcessModal activeId={activeId} show={show} setShow={setShow} />}
    </div>
  )
}

export default ProductProcess
