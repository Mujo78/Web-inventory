import { Sidebar, Button, Avatar } from 'flowbite-react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { authUser, logout, reset } from '../features/auth/authSlice'
import {AiFillDashboard} from "react-icons/ai"
import { useSelector } from 'react-redux'
import {FcProcess} from "react-icons/fc"
import {FaFileContract, FaUsers} from "react-icons/fa"
import {MdBuild, MdLayers} from "react-icons/md"
import {IoMdSettings} from "react-icons/io"

const DashSidebar = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {accessUser} = useSelector(authUser)

  const onLogOut = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <div className="w-fit h-screen">
      <Sidebar>
        <Sidebar.Items className='h-full border-r-2 border-r-green-500 flex flex-col justify'>
          <Sidebar.ItemGroup className='pt-4 first:pt-5 py-0'>
              <Sidebar.Item
                as={NavLink}
                to="dashboard">
                  <div className="flex justify-start gap-4 h-full items-center">
                    <Avatar rounded={true} />
                    <span className='font-semibold text-xl'>{accessUser?.username}</span>
                  </div>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup className='flex flex-col justify-center'>     
            <Sidebar.Item as={NavLink}
              to="dashboard"
              icon={AiFillDashboard}
              className="mt-3"
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item 
              as={NavLink}
              to="products"
              icon={MdLayers}
              className="mt-3"
            >
              Products
            </Sidebar.Item>
            <Sidebar.Item as={NavLink}
              to="materials"
              icon={MdBuild}
              className="mt-3"
            >
              Materials
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              to="product-process"
              icon={FcProcess}
              className="mt-3"
            >
              Product process
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              to="suppliers"
              icon={FaFileContract}
              className="mt-3"
            >
              Suppliers
            </Sidebar.Item>
            {
              accessUser?.role === 'Admin' &&
              <Sidebar.Item
                as={NavLink}
                to="employee"
                icon={FaUsers}
                className="mt-3"
              >
                Employee
              </Sidebar.Item>
            }
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className='flex flex-col justify-between h-full'>
          <Sidebar.Item
              as={NavLink}
              to="settings"
              icon={IoMdSettings}
            >
              Settings
            </Sidebar.Item>
            <Sidebar.Item>
                <Button className='w-full mb-5' color="success"  onClick={onLogOut}>Log out</Button>
            </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
</div>
  )
}

export default DashSidebar
