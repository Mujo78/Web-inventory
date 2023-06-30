import axios from 'axios'
import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'

interface Props {
    _id: string,
    quantity: number,
    name: string,
    materialQuantity: number
}

const LayoutForm: React.FC<Props> = ({_id, quantity, name, materialQuantity}) => {

    const [formData, setFormData] = useState<{quantity: number}>(() => ({
        quantity: quantity
    }))

    const handleChange = (event : React.FormEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
    
        setFormData ((n) =>({
          ...n,
          [name]: value
        }))
    }

    const handleSubmit = (e : React.FormEvent) =>{
        e.preventDefault();
        if(formData.quantity !== quantity){
            axios.patch(`/edit-process-item/${_id}`, formData)
            .then(() => console.log("Well done!"))
            .catch((err) => console.log(err))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='p-2 flex flex-col items-Start justify-center'>
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
                        value={formData.quantity > materialQuantity ? materialQuantity : formData.quantity}
                        onChange={handleChange}
                    />
                    <Button type='submit' color="success">Save</Button>
                </div>
            </form>
        </div>
    )
}

export default LayoutForm
