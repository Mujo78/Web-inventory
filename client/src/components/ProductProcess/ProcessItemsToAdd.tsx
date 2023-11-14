import { Button, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { MaterialToAdd } from '../../pages/product_process/EditPP'
import { selectedMaterials } from './PPItems'
import { IoMdAdd } from 'react-icons/io'

interface Props {
    item: MaterialToAdd,
    materialsItems: selectedMaterials[],
    setMaterialsItems: React.Dispatch<React.SetStateAction<selectedMaterials[]>>
    process_id: string,
}

interface FormData {
    product_process_id: string,
    quantity: string,
    material_id: string
}

const ProcessItemsToAdd: React.FC<Props> = ({item, process_id, materialsItems, setMaterialsItems}) => {

    const [formData, setFormData] = useState<FormData>({
        product_process_id: process_id,
        quantity: "",
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

        if(Number(formData.quantity) !== 0){
            
            const newItem = {
                product_process_id: formData.product_process_id,
                quantity: Number(formData.quantity),
                material_id: formData.material_id
            }

            const updatedItems = [...materialsItems, newItem]
            setMaterialsItems(updatedItems)
        }
    }

    return (
        <>
            <li key={item._id} className="flex items-center justify-between py-3">
                <div className="flex-auto">
                    <p className="text-sm font-semibold text-gray-900">{item.name} ({item.quantity})</p>
                </div>
                <div className="mr-4 flex justify-end">
                    <form className='flex items-center justify-center' onSubmit={addItem}>
                        <TextInput
                            sizing={"sm"}
                            min={1}
                            max={item.quantity}
                            type='number'
                            name='quantity'
                            disabled={materialsItems.some(el => el.material_id === item._id)}
                            value={Number(formData.quantity) > item.quantity ? item.quantity : formData.quantity}
                            onChange={handleChange}
                            className='mr-2'
                        />
                        <Button
                            disabled={materialsItems.some(el => el.material_id === item._id)}
                            size="xs"
                            onClick={addItem} 
                            color="success">
                            <IoMdAdd />
                        </Button>
                    </form>
                </div>
            </li>
        </>
    )
}

export default ProcessItemsToAdd
