import React, { useEffect, useState } from 'react'
import { Tooltip } from 'flowbite-react'
import { getDate } from '../../helpers/ProductProcessSideFunc'
import { deactivateProcess, getActiveProcess, getProcessById, process, specificProcessType } from '../../features/process/processSlice'
import CustomButton from '../UI/CustomButton'
import { FiEdit } from 'react-icons/fi'
import { MdDisabledByDefault } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import CustomSpinner from '../UI/CustomSpinner'


const style = {
    height: "20px",
    color: "white"
}

interface Props {
    activeProcessData: specificProcessType,
    variant: 1 | 2
}

const ProductProcessDetails: React.FC<Props> = ({activeProcessData, variant}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const {specificProcess, activeProcess, status} = useSelector(process)


    const makeDeactive = () => {
        dispatch(deactivateProcess(activeProcessData.processData._id))
      }
      
  return (
    <>
        {
            status !== 'failed' && activeProcessData !== undefined ?
                <div className='flex flex-col h-full items-start'>
                <div className='divide-y w-full flex flex-col justify-between h-full'>
                    <div className='px-6 py-4 divide-y w-full h-4/5'>
                        <div className='h-2/5 w-full'>
                            <div className='w-full'>
                                {variant === 2 && <h1 className='font-semibold text-end'>Current active process</h1>}
                                <h1 className='text-xl'>{activeProcessData.processData.name}</h1>
                                <p className='text-green-600'>Start Date: {getDate(activeProcessData.processData?.start_date as Date)}</p>
                            </div>
                        </div>
                        <div className='h-3/5 flex flex-wrap'>
                            {activeProcessData.processItems.length > 0 ?
                                activeProcessData.processItems.map((m) =>(
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
                        <CustomButton className='h-full flex-grow rounded-none bg-gray-300 rounded-bl-lg hover:!bg-gray-400' onClick={() => navigate(`/edit-process/${activeProcessData.processData._id}`)} v={1}>
                            <FiEdit style={style} />
                            </CustomButton>
                            {activeProcessData.processData.start_date && activeProcessData.processData.end_date ? "" 
                            :
                            <CustomButton className='h-full flex-grow bg-red-600 rounded-none !rounded-br-lg hover:!bg-red-700' onClick={makeDeactive} v={2}>
                                <MdDisabledByDefault style={style} />
                            </CustomButton>}
                    </div>
                </div>
                </div> : 
            <div>
                messae
            </div>
        }
    </>
  )
}

export default ProductProcessDetails
