import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Material } from '../features/material/materialSlice'

interface ProductItem {
    _id: string,
    material_id: Material,
    product_process_id : string,
    quantity: number
}

const EditPPItems : React.FC<{pp_id: string | ''}> = ({pp_id}) => {

    const [items, setItems] = useState<ProductItem[]>([])
    const [messageError, setMessageError] = useState<string>("")

    const getItems = async () =>{
        try{
            const res = await axios.get("/items")
            const data = res.data

            setItems(data)
        }catch(error: any) {
            setMessageError(error.data)
        }
    }

    useEffect(() => {
        getItems()
    }, [])

  return (
    <div>
        
    </div>
  )
}

export default EditPPItems
