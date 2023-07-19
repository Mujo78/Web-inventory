import React from 'react'
import { Navbar } from 'flowbite-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import PageLayout from '../../components/PageLayout'

const SupplierLayout: React.FC = () => {

  const location = useLocation()

  return (
      <PageLayout title='Important update: Check out our latest supplier information below!' alert={true}>
          <Navbar.Link
          className={`hover:!text-green-500 ${location.pathname === "/suppliers" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
            as={Link}
            active={location.pathname === "/suppliers" && true}
            to="suppliers"
          >
            Overview
          </Navbar.Link>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/add-supplier" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
            as={NavLink}
            active={location.pathname === "/add-supplier" && true}
            to="add-supplier"
          >
            Add supplier
          </Navbar.Link>
      </PageLayout>
  )
}

export default SupplierLayout
