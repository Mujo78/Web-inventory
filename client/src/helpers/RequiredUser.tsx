import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const RequiredUser = () => {
    const user = localStorage.getItem("user")

    const navigate = useNavigate()

    useEffect(() =>{
        if(!user) navigate("/")
    }, [navigate, user])

    return <Outlet />
}

export default RequiredUser
