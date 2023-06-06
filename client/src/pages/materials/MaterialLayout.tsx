import React from 'react'
import { Navbar } from 'flowbite-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'


const MaterialLayout: React.FC = () => {

  const location = useLocation()

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
            className={`hover:!text-green-500 ${location.pathname === "/materials" && `!text-green-500`}`}
            as={Link}
            active={location.pathname === "/materials" && true}
            to="materials"
          >
            Overview
          </Navbar.Link>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/add-material" && `!text-green-500`}`}
            as={NavLink}
            active={location.pathname === "/add-material" && true}
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
