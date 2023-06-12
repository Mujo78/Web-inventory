import React, {useState } from 'react'
import { Alert, Navbar } from 'flowbite-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const SupplierLayout: React.FC = () => {

  const [showAlert , setShowAlert] = useState<boolean>(true)

  const dismissIt = () =>{
    setShowAlert(n => !n)
  }

  const location = useLocation()

  return (
    <div className='w-full'>
      {showAlert && <Alert
        color="success"
        className='w-full font-semibold'
        onDismiss={dismissIt}
      >
        Important update: Check out our latest supplier information below!
      </Alert>}
      <Navbar
          className='!bg-gray-200 my-3 py-4 !border-gray-400'
            fluid
            rounded
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
          className={`hover:!text-green-500 ${location.pathname === "/suppliers" && `!text-green-500`}`}
            as={Link}
            active={location.pathname === "/suppliers" && true}
            to="suppliers"
          >
            Overview
          </Navbar.Link>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/add-supplier" && `!text-green-500`}`}
            as={NavLink}
            active={location.pathname === "/add-supplier" && true}
            to="add-supplier"
          >
            Add supplier
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default SupplierLayout
