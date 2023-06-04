import React, {useState } from 'react'
import { Alert, Navbar } from 'flowbite-react'
import { Link, NavLink, Outlet } from 'react-router-dom'


const MaterialLayout: React.FC = () => {
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
          className='hover:!text-green-500'
            as={Link}
            to="materials"
          >
            Overview
          </Navbar.Link>
          <Navbar.Link
          className='hover:!text-green-500'
            as={NavLink}
            to="add-material"
          >
            Add material
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default MaterialLayout
