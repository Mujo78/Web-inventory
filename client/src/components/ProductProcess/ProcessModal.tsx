import { Modal } from 'flowbite-react'
import React, { useEffect } from 'react'
import ProductProcessDetails from './ProductProcessDetails'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { getProcessById, process } from '../../features/process/processSlice'
import CustomSpinner from '../UI/CustomSpinner'

interface Props {
    activeId: string | undefined,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ProcessModal: React.FC<Props> = ({activeId, show, setShow}) => {

    
    const dispatch = useAppDispatch()
    const {specificProcess, status} = useSelector(process)

    useEffect(() => {
        if(activeId) dispatch(getProcessById(activeId))
    }, [dispatch, activeId])


  return (
    <Modal dismissible show={show} onClose={() => setShow(false)}>
    <Modal.Header></Modal.Header>
    <Modal.Body>
        {status === 'loading' && <div className='h-full w-full flex justify-center items-center'>
            <CustomSpinner />
        </div>}
        {specificProcess && status !== 'failed' && <ProductProcessDetails variant={1} activeProcessData={specificProcess} />}
    </Modal.Body>
    <Modal.Footer>
   
    </Modal.Footer>
  </Modal>
  )
}

export default ProcessModal
