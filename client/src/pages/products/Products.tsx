import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux';
import { getProducts, product } from '../../features/product/productSlice';
import { Alert } from 'flowbite-react';
import ProductCard from '../../components/ProductCard';

const Products: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() =>{
    dispatch(getProducts())
  }, [dispatch])

  const {products, message, status} = useSelector(product)
  return (
    <div>
      {products.length > 0 ? (
        <div className='flex flex-wrap w-full justify-start items-start'>
          {products.map(n => (
            <ProductCard key={n._id} item={n} />
          ))}
        </div>
      ) : <Alert>
          <h1>{status === "failed" ? message : "There are no products available!"}</h1>
        </Alert>}
    </div>
  )
}

export default Products
