import { Navbar } from 'flowbite-react'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const ProductLayout = () => {
  const location = useLocation();
    return (
    <div className='w-full'>
       <Navbar
          className='!bg-gray-200 my-3 py-4 !border-gray-400'
            fluid
            rounded
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/products" && `!text-green-500`}`}
            as={Link}
            active={location.pathname === "/products" && true}
            to="products"
          >
            Overview
          </Navbar.Link>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/add-product" && `!text-green-500`}`}
            as={Link}
            active={location.pathname === "/add-product" && true}
            to="add-product"
          >
            Add product
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default ProductLayout
