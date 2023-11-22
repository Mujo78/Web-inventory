import React, { useEffect } from 'react'
import { deactivateProcess, getActiveProcess, process } from '../../features/process/processSlice'
import { Card, CustomFlowbiteTheme, Tooltip  } from 'flowbite-react'
import CustomSpinner from '../UI/CustomSpinner'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import { getDate } from '../../helpers/ProductProcessSideFunc'
import CustomButton from '../UI/CustomButton'
import { FiEdit } from 'react-icons/fi'
import { MdDisabledByDefault } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const customTheme: CustomFlowbiteTheme['card'] = {
    root: {
      children: "flex h-full flex-col justify-center gap-4 !p-0"
    }
  }

  const style = {
    height: "20px",
    color: "white"
}
  
interface Props {
    activeId: string | undefined
}

const CurrentActiveProcess: React.FC<Props> = ({activeId}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {activeProcess, status} = useSelector(process)

    useEffect(() => {
        if(activeId) dispatch(getActiveProcess(activeId))
    }, [dispatch, activeId])

    const makeDeactive = () => {
        if(activeId) dispatch(deactivateProcess(activeId))
    }

  return (
    <Card className='h-2/4' theme={customTheme}>

        {!activeId && status === 'loading' ?
            <div className='h-full w-full'>
                <CustomSpinner />
        </div>
        :
        status !== 'failed' && activeProcess !== undefined ?
        <div className='flex flex-col h-full items-start'>
            <div className='divide-y w-full flex flex-col justify-between h-full'>
                <div className='px-6 py-4 divide-y w-full h-4/5'>
                    <div className='h-2/5 w-full'>
                        <div className='w-full'>
                            <h1 className='font-semibold text-end'>Current active process</h1>
                            <h1 className='text-xl'>{activeProcess.processData.name}</h1>
                            <p className='text-green-600'>Start Date: {getDate(activeProcess.processData?.start_date as Date)}</p>
                        </div>
                    </div>
                    <div className='h-3/5 flex flex-wrap'>
                        {activeProcess.processItems.length > 0 ?
                            activeProcess.processItems.map((m) =>(
                                <div key={m._id} color='success' className='w-fit h-fit text-sm border rounded-lg cursor-pointer m-1.5 p-1.5 hover:!bg-green-100'>
                                    <Tooltip content={m.quantity}>
                                        <p>{m.material_id.name}</p>
                                    </Tooltip>
                                </div>
                        ))
                        : 
                        <div className='flex justify-center h-full w-full items-center'>
                            <p className='text-gray-400 text-xs'>This Process doesn't have any items.</p>
                        </div>
                    }
                    </div>
                </div>
                <div className='h-1/6 w-full flex'>
                    <CustomButton className='h-full flex-grow rounded-none bg-gray-300 rounded-bl-lg hover:!bg-gray-400' onClick={() => navigate(`/edit-process/${activeProcess.processData._id}`)} v={1}>
                        <FiEdit style={style} />
                        </CustomButton>
                        {activeProcess.processData.start_date && activeProcess.processData.end_date ? "" 
                        :
                        <CustomButton className='h-full flex-grow bg-red-600 rounded-none !rounded-br-lg hover:!bg-red-700' onClick={makeDeactive} v={2}>
                            <MdDisabledByDefault style={style} />
                        </CustomButton>}
                </div>
            </div>
        </div>
        :
            <div className='h-ful w-full flex justify-center items-center'>
                <p>There's no active process. Choose one!</p>
            </div>
        }
  </Card>
  )
}

export default CurrentActiveProcess
