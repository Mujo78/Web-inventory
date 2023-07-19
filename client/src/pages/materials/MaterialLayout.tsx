import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageLayout from '../../components/PageLayout'
import { Navbar } from 'flowbite-react'


const MaterialLayout: React.FC = () => {

  const location = useLocation()

  return (
      <PageLayout>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/materials" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
            as={Link}
            active={location.pathname === "/materials" && true}
            to="materials"
            >
            Overview
          </Navbar.Link>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/add-material" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
            as={Link}
            active={location.pathname === "/add-material" && true}
            to="add-material"
            >
            Add material
          </Navbar.Link>
      </PageLayout>
  )
}

export default MaterialLayout
