import { Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageLayout from '../../components/PageLayout';

const ProductLayout : React.FC = () => {
  const location = useLocation();
    return (
      <PageLayout>
            <Navbar.Link
              className={`hover:!text-green-500 ${location.pathname === "/products" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
              as={Link}
              active={location.pathname === "/products" && true}
              to="products"
              >
              Overview
            </Navbar.Link>
            <Navbar.Link
              className={`hover:!text-green-500 ${location.pathname === "/add-product" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500 `}`}
              as={Link}
              active={location.pathname === "/add-product" && true}
              to="add-product"
              >
              Add product
            </Navbar.Link>
        </PageLayout>
  )
}

export default ProductLayout
