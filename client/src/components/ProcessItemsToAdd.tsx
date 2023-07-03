import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { MaterialToAdd } from '../pages/product_process/EditPP'
import { selectedMaterials } from './PPItems'

interface Props {
    item: MaterialToAdd,
    materialsItems: selectedMaterials[],
    setMaterialsItems: React.Dispatch<React.SetStateAction<selectedMaterials[]>>
    process_id: string,
}



const ProcessItemsToAdd: React.FC<Props> = ({item,process_id, materialsItems, setMaterialsItems}) => {

    const [formData, setFormData] = useState<selectedMaterials>({
        product_process_id: process_id,
        quantity: 1,
        material_id: item._id
    })

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;

        setFormData((n) => ({
            ...n,
            [name] : value
        }))
    }

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();

    }

    return (
        <>
            <li key={item._id} className="flex items-center justify-between py-3">
                <div className="flex-auto">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                </div>
                <div className="mr-4 flex justify-end">
                    <form className='flex' onSubmit={addItem}>
                        <TextInput 
                            min={1}
                            max={item.quantity}
                            type='number'
                            name='quantity'
                            value={formData.quantity > item.quantity ? item.quantity : formData.quantity}
                            onChange={handleChange}
                            className='w-3/4 mr-3 border-0 border-b focus:!ring-0' 
                        />
                        <Button size="xs" onClick={addItem} color="success">Add</Button>
                    </form>
                </div>
            </li>
        </>
    )
}

export default ProcessItemsToAdd
