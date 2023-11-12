import React from 'react'
import { Link } from 'react-router-dom';
import { Avatar, CustomFlowbiteTheme, Flowbite, Navbar } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { authUser } from '../features/auth/authSlice';

const customTheme: CustomFlowbiteTheme['navbar'] = {
    root: {
        base: "mx-auto flex flex-wrap items-center justify-between"
    }
}

const CustomNavbar: React.FC = () => {

    const date = new Date().toDateString()
    const {selected, accessUser} = useSelector(authUser)

  return (
        <nav className='w-full font-Rubik font-semibold border-b p-3'>
            <div className='flex justify-between px-3 w-full items-center'>
                <div className='w-2/3'>
                    <p>{selected}</p>
                </div>
                <div className='w-2/3'>
                   <p>{date}</p>
                </div>
                <div className='flex w-1/3 items-center justify-end gap-4'>
                    <p>{accessUser.username}</p>
                    <Avatar alt='s' size="sm" bordered rounded />
                </div>
            </div>
        </nav>
  )
}

export default CustomNavbar
