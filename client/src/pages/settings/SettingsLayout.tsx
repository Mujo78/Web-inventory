import React from 'react'
import { Alert, Navbar } from 'flowbite-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const SettingsLayout = () => {

    const location = useLocation();

  return (
    <div className='w-full'>
        <Alert 
            color="success"
            icon={AiOutlineInfoCircle}
            >
                <h1><b>Important:</b> If this is your first time to sign in, please change your password!</h1>
        </Alert>
      <Navbar
          className='!bg-gray-200 my-3 py-4 !border-gray-400'
            fluid
            rounded
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/change-password" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
            as={NavLink}
            active={location.pathname === "/change-password"}
            to="change-password"
          >
            Change Password
          </Navbar.Link>
          
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default SettingsLayout
