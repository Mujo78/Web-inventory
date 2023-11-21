import React, { useEffect } from 'react'
import { getActiveProcess, process, specificProcessType } from '../../features/process/processSlice'
import { Card, CustomFlowbiteTheme  } from 'flowbite-react'
import CustomSpinner from '../UI/CustomSpinner'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../app/hooks'
import ProductProcessDetails from './ProductProcessDetails'

const customTheme: CustomFlowbiteTheme['card'] = {
    root: {
      children: "flex h-full flex-col justify-center gap-4 !p-0"
    }
  }
  
interface Props {
    activeId: string | undefined
}

const CurrentActiveProcess: React.FC<Props> = ({activeId}) => {

    const dispatch = useAppDispatch()
    const {activeProcess} = useSelector(process)

    useEffect(() => {
        if(activeId) dispatch(getActiveProcess(activeId))
    }, [dispatch, activeId])

  return (
    <Card className='h-2/4' theme={customTheme}>
        {activeId === undefined ? (
            <div className='h-ful w-full flex justify-center items-center'>
                <p>There's no active process. Choose one!</p>
            </div>)
        :
        activeProcess ? (
      <ProductProcessDetails variant={2} activeProcessData={activeProcess} />
    ) :
    <div className='h-full w-full'>
        <CustomSpinner />
    </div>
    }
  </Card>
  )
}

export default CurrentActiveProcess
