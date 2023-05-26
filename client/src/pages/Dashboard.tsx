import { Button } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'
import DashSidebar from '../components/DashSidebar'
import { useSelector } from 'react-redux'
import { supplier } from '../features/supplier/suppSlice'

const Dashboard: React.FC = () => {
  
  return (
    <div>
      <h1>All thing will go here</h1>
    </div>
  )
}

export default Dashboard
