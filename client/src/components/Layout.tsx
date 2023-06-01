import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import DashSidebar from './DashSidebar'

const Layout: React.FC = () => {

  return (
    <div className='flex w-full'>
      <main className='w-full'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
