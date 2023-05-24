import React from 'react'
import { Outlet } from 'react-router-dom'
import DashSidebar from './DashSidebar'

const HomeLayout: React.FC = () => {
  
    return (
    <div className='flex'>
        <DashSidebar />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default HomeLayout
