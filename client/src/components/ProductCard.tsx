import { Card } from 'flowbite-react'
import React, { useState } from 'react'
import { Product } from '../features/product/productSlice'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

interface Props {
    item: Product
}

const ProductCard: React.FC<Props> = ({item}) => {
    
    const navigate = useNavigate();

    const [editIcon, setEditIcon] = useState(false)
    const seeMore = (id: string) =>{
        console.log(id)
        navigate(`/product/${id}`)
      }
    
    const handleShowIcon = () => {
        setEditIcon(true)
    }

    const handleHideIcon = () => {
        setEditIcon(false)
    }

    const handleEdit = (e: React.FormEvent) => {
        e.stopPropagation()
        navigate(`/edit-product/${item._id}`)
    }

    return (
        <Card
            className='max-w-xs relative !p-0 !m-2 cursor-pointer hover:ease-out hover:!bg-gray-100'
            onClick={() => seeMore(item._id)}
            imgSrc={item.photo_url && item.photo_url}
            imgAlt='product_photo'
            onMouseEnter={handleShowIcon}
            onMouseLeave={handleHideIcon}
        >
            {editIcon && 
                <button onClick={handleEdit} className='absolute top-2 right-2  bg-gray-300 hover:scale-110 transition duration-150 ease-in p-2 rounded-full w-fit'>
                    <FiEdit className='h-3' />
                </button>
            }
            <h1>{item.name}</h1>
            <p>{item.price}</p>
        </Card>
    )
}

export default ProductCard
