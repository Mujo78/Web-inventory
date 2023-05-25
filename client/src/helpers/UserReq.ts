import {redirect } from 'react-router-dom'

const UserReq = () => {
   
    const user = localStorage.getItem("user")

    if (!user) {
        return redirect('/');
    }

    return null
}

export default UserReq
