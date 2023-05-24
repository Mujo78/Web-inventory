import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const UserReq = () => {
   
    const user = localStorage.getItem("user")

    const navigate = useNavigate()

    useEffect(() =>{
        if(user){
            navigate("/dashboard")
        }else{
            navigate("/")
        }

    }, [user, navigate])

    return <Outlet />
}

export default UserReq
