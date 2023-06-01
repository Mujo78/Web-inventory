import { redirect } from "react-router-dom";

const UserRequired = () => {
    const user = localStorage.getItem("user")

    if (!user) {
        return redirect('/');
    }
    
    return null
}

export default UserRequired
