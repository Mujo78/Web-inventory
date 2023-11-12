import React from 'react'
import PageLayout from '../../components/PageLayout'
import useSelectedPage from '../../hooks/useSelectedPage'

const SupplierLayout: React.FC = () => {

  useSelectedPage("Suppliers")

  return (
      <PageLayout title='Important update: Check out our latest supplier information below!' alert={true}>
    
      </PageLayout>
  )
}

export default SupplierLayout
