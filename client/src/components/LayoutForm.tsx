import axios from 'axios'
import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { AiOutlineMinus} from 'react-icons/ai'
import { useAppDispatch } from '../app/hooks'
import { deleteSpecificProcessItem } from '../features/process/processSlice'

interface Props {
    _id: string,
    quantity: number,
    name: string,
    materialQuantity: number,
    toggleShow: boolean,
    setToggleShow: React.Dispatch<React.SetStateAction<boolean>>
}

const LayoutForm: React.FC<Props> = ({_id, quantity, name, toggleShow, setToggleShow, materialQuantity}) => {

    const [qnty, setQnty] = useState<string>(String(quantity))
    const dispatch = useAppDispatch();

    const handleChange = (event : React.FormEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setQnty(value)
    }

    const handleSubmit = (e : React.FormEvent) =>{
        e.preventDefault();
        if(Number(qnty) !== quantity){
            const newItem = {
                quantity: Number(qnty)
            }
            axios.patch(`/edit-process-item/${_id}`, newItem)
            .then(() => console.log("Well done!"))
            .catch((err) => console.log(err))
        }
    }

    const showDelete = () => {
        setToggleShow((n) => !n)
    }

    const deleteItem = () => {
        dispatch(deleteSpecificProcessItem(_id))
    }

    return (
        <div>
                <CustomButton onClick={showDelete} v={!toggleShow ? 1 : 2}>
                    <AiOutlineMinus style={{height: "12px", width: "100%", color: `${!toggleShow ? "red" : "green"}`}} />
                </CustomButton>
            
            {!toggleShow ? 
                <form onSubmit={handleSubmit} className='p-2 flex flex-col justify-center'>
                    <Label htmlFor='name'>Name</Label>
                    <TextInput
                        autoComplete='off'
                        id='name'
                        type='text'
                        className='mt-1'
                        disabled
                        name='name'
                        value={name}
                    />
                    <Label htmlFor='quantity' className='mt-2'>Quantity</Label>
                    <div className='flex mt-1 justify-between'>
                        <TextInput
                            autoComplete='off'
                            className='w-3/5'
                            type='number'
                            id='quantity'
                            name='quantity'
                            min={1}
                            max={materialQuantity}
                            value={Number(qnty) > materialQuantity ? materialQuantity : qnty}
                            onChange={handleChange}
                        />
                        <Button type='submit' color="success">Save</Button>
                    </div>

            </form> 
                    : 
                    <div className='p-4 flex flex-col items-center justify-center'>
                        <p className='text-sm text-black'>Delete: {name} ?</p>
                        <p className='text-xs text-red-500'>Are you sure ?</p>
                        <div className='w-full mt-2 flex flex-col justify-between'>
                            <Button onClick={deleteItem} size="sm" className='' color="failure">Yes</Button>
                            <Button onClick={showDelete}  size="sm" className='mt-2' color="light">No</Button>
                        </div>
                    </div>
                }
        </div>
    )
}

export default LayoutForm
