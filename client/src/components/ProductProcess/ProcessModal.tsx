import { Button, Modal, Table } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { getProcessById, process, resetSpecificProcess } from '../../features/process/processSlice'
import CustomSpinner from '../UI/CustomSpinner'
import { getDate } from '../../helpers/ProductProcessSideFunc'

interface Props {
    activeId: string | undefined,
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ProcessModal: React.FC<Props> = ({activeId, show, setShow}) => {

    
    const dispatch = useAppDispatch()
    const {specificProcess} = useSelector(process)

    useEffect(() => {
        if(activeId) dispatch(getProcessById(activeId))
    }, [dispatch, activeId])

    const onClose = () =>{
        dispatch(resetSpecificProcess())
        setShow(false)
    }

    if(specificProcess === undefined){
        return (
          <Modal>
            <Modal.Body>
              <CustomSpinner />
            </Modal.Body>
          </Modal>
        )
      }

  return (
    <Modal dismissible show={show} onClose={onClose}>
        <Modal.Header>{specificProcess?.processData.name}</Modal.Header>
        <Modal.Body>
            <div className='flex w-full justify-between'>
                {specificProcess?.processData?.start_date && <p>Start Date: <b className='text-green-600'>{getDate(specificProcess?.processData?.start_date)}</b></p>}
                {specificProcess?.processData?.end_date && <p>End Date: <b className='text-red-600'>{getDate(specificProcess?.processData?.end_date)}</b></p>}
            </div>
        {specificProcess?.processItems && specificProcess.processItems.length > 0 ? 
                <div id='content' className='h-[280px] overflow-y-scroll'>
                    <Table>
                        <Table.Body className='!max-h-[200px] divide-y w-full overflow-y-auto'>
                            <Table.Row className='divide-x font-bold'>
                                <Table.Cell>Name</Table.Cell>
                                <Table.Cell>Quantity</Table.Cell>
                                <Table.Cell>Price</Table.Cell>
                                <Table.Cell>Unit</Table.Cell>
                            </Table.Row>
                            {specificProcess?.processItems.map((m) =>(
                                <Table.Row key={m._id} className='divide-x'>
                                    <Table.Cell>{m.material_id.name}</Table.Cell>
                                    <Table.Cell>{m.quantity}</Table.Cell>
                                    <Table.Cell>{m.material_id.price}</Table.Cell>
                                    <Table.Cell>{m.material_id.unit_of_measure}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            : 
            <p className='text-center p-10 text-sm text-gray-400'>This process doesn't have any items.</p>    
        }
        </Modal.Body>
        <Modal.Footer className='flex justify-between'>
            <p>Price: <b>{specificProcess?.processData?.price?.toFixed(2) || 0}$</b></p>
            <Button color='light' onClick={onClose}>
                Close
            </Button>
        </Modal.Footer>
  </Modal>
  )
}

export default ProcessModal
