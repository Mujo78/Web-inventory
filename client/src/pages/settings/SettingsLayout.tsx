import React, { useEffect, useState } from 'react'
import { Navbar } from 'flowbite-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import useSelectedPage from '../../hooks/useSelectedPage'
import CustomToast from '../../components/UI/CustomToast'

const SettingsLayout: React.FC = () => {

  const [show, setShow] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(interval)
    }
  }, [])

    const location = useLocation();

    useSelectedPage("Settings")
    const message = "Important: If this is your first time to sign in, please change your password!"
  return (
    <div className='w-full relative'>
        {show && <div className='absolute right-0 top-10'>
          <CustomToast 
              status='idle'
              message={message}
              />
        </div>}
      <Navbar
          className='!bg-gray-200 py-4 !border-gray-400'
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
