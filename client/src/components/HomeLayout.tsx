import React from 'react'
import { Outlet } from 'react-router-dom'
import DashSidebar from './DashSidebar'

const HomeLayout: React.FC = () => {
  
    return (
    <div className='flex w-full'>
        <div className='flex-shrink-0'>
            <DashSidebar />
        </div>
        <div className='flex-grow flex justify-center py-4 pr-3'>
            <Outlet />
        </div>
    </div>
  )
}

export default HomeLayout
