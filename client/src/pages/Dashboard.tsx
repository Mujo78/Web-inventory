import React from 'react'
import useSelectedPage from '../hooks/useSelectedPage'

const Dashboard: React.FC = () => {

  useSelectedPage("Dashboard")
  
  return (
    <div>
      <h1>All thing will go here</h1>
    </div>
  )
}

export default Dashboard
