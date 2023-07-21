import { Sidebar, Button, Avatar } from 'flowbite-react'
import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { authUser, logout, reset } from '../features/auth/authSlice'
import {AiFillDashboard} from "react-icons/ai"
import { useSelector } from 'react-redux'
import {FcProcess} from "react-icons/fc"
import {FaFileContract, FaUsers} from "react-icons/fa"
import {MdBuild, MdLayers} from "react-icons/md"
import {IoMdSettings, IoIosHelpCircleOutline} from "react-icons/io"

const DashSidebar = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const location = useLocation()
  const {accessUser} = useSelector(authUser)

  const onLogOut = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }
  console.log(location.pathname)

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
              active={location.pathname === '/dashboard'}
              icon={AiFillDashboard}
              className="mt-3"
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item 
              as={NavLink}
              to="products"
              active={location.pathname === '/products' || location.pathname === '/add-product'}
              icon={MdLayers}
              className="mt-3"
            >
              Products
            </Sidebar.Item>
            <Sidebar.Item as={NavLink}
              to="materials"
              active={location.pathname === '/materials' || location.pathname === '/add-material'}
              icon={MdBuild}
              className="mt-3"
            >
              Materials
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              active={location.pathname === '/processes' || location.pathname === '/add-process'}
              to="processes"
              icon={FcProcess}
              className="mt-3"
            >
              Product process
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              active={location.pathname === '/suppliers' || location.pathname === '/add-supplier'}
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
                active={location.pathname.includes('/employee')}
                to="employee"
                icon={FaUsers}
                className="mt-3"
              >
                Employee
              </Sidebar.Item>
            }
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className='flex flex-col justify-between h-full'>
          <Sidebar.ItemGroup>
          <Sidebar.Item
              as={NavLink}
              active={location.pathname === '/change-password'}
              to="change-password"
              icon={IoMdSettings}
            >
              Settings
            </Sidebar.Item>
            <Sidebar.Item
              as={NavLink}
              active={location.pathname === '/contact' || location.pathname === '/about'}
              to="contact"
              icon={IoIosHelpCircleOutline}
            >
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
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
