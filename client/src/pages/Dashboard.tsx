import { Button } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'
import DashSidebar from '../components/DashSidebar'

const Dashboard: React.FC = () => {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()


  
  return (
    <div>
      <p>asudnsaundsaiundisa</p>
    </div>
  )
}

export default Dashboard
