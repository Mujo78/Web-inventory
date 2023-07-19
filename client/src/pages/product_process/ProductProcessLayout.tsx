import { Navbar } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageLayout from '../../components/PageLayout'

const ProductProcessLayout: React.FC = () => {

    const location = useLocation()
  
    return (
      <PageLayout alert={true} title='Info: Only one product proccess can be active <i>(activate/deactivate process by clicking green/red)'>
            <Navbar.Link
              className={`hover:!text-green-500 ${location.pathname === "/processes" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
              as={Link}
              active={location.pathname === "/processes" && true}
              to="processes"
              >
              Overview
            </Navbar.Link>
            <Navbar.Link
              className={`hover:!text-green-500 ${location.pathname === "/add-process" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
              as={Link}
              active={location.pathname === "/add-process" && true}
              to="add-process"
              >
              Add process
            </Navbar.Link>
      </PageLayout>
  )
}

export default ProductProcessLayout
