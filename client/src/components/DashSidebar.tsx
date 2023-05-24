import { Sidebar, Button } from 'flowbite-react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'

const DashSidebar = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onLogOut = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <div className="w-fit h-screen p-0">
      <Sidebar className='p-0 m-0'>
        <Sidebar.Items className='bg-green-500 px-0'>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={NavLink}
              to="/"
              icon=""
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item as={NavLink}
              to="option"
              icon=""
            >
              Option 1
            </Sidebar.Item>
            <Sidebar.Item as={NavLink}
              to="options"
              icon=""
            >
              Option 2
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon=""
            >
              Users
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon=""
            >
              Products
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon=""
            >
              Sign In
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon=""
            >
              Sign Up
            </Sidebar.Item>
            <Sidebar.Item>
                <Button onClick={onLogOut}>Log out</Button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
</div>
  )
}

export default DashSidebar
