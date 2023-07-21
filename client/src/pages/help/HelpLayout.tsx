import React from 'react'
import PageLayout from '../../components/PageLayout'
import { Navbar } from 'flowbite-react'
import { NavLink, useLocation } from 'react-router-dom'

const HelpLayout = () => {
    const location = useLocation()
  return (
   <PageLayout title='Contact us by form if you need anything, or you see some bugs :)' alert={true}>
          <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/contact" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
            as={NavLink}
            active={location.pathname === "/contact"}
            to="contact"
          >
            Contact us
          </Navbar.Link>
        <Navbar.Link
            className={`hover:!text-green-500 ${location.pathname === "/about" && `!text-green-500 underline underline-offset-8 decoration-2 decoration-green-500`}`}
            as={NavLink}
            active={location.pathname === "/about"}
            to="about"
          >
            About
          </Navbar.Link>
   </PageLayout>
  )
}

export default HelpLayout
