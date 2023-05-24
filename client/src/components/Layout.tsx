import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import DashSidebar from './DashSidebar'

const Layout: React.FC = () => {

  const user = localStorage.getItem("user")
  const navigate = useNavigate()

  useEffect(() =>{
      if(user){
          navigate("/dashboard")
      }else{
        navigate("/")
      }
  }, [user, navigate])

  return (
    <div className='flex  px-0 py-0'>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
