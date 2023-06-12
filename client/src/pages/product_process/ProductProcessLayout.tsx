import { Alert, Navbar } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'


const ProductProcessLayout: React.FC = () => {
    const [showAlert , setShowAlert] = useState<boolean>(true)
  
    const dismissIt = () =>{
        setShowAlert(n => !n)
      }

      const location = useLocation()
  
    return (
    <div className='w-full'>
        {showAlert && <Alert
            onDismiss={dismissIt}
            color="success"
        >
            <h1 className="font-bold">Info: Only one product proccess can be active!</h1>
        </Alert>}
        <Navbar
          className='!bg-gray-200 my-3 py-4 !border-gray-400'
            fluid
            rounded
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/processes" && `!text-green-500`}`}
            as={Link}
            active={location.pathname === "/processes" && true}
            to="processes"
          >
            Overview
          </Navbar.Link>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/add-process" && `!text-green-500`}`}
            as={Link}
            active={location.pathname === "/add-process" && true}
            to="add-process"
          >
            Add process
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default ProductProcessLayout
