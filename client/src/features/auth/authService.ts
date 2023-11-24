import axios from "axios";

export interface LoginUser {
    username: string,
    password: string
}

const login =  async(loginData: LoginUser) => {
    const response = await axios.post("/api/login", loginData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))   
    }
    
    return response.data;
}

const logout = () => {
    localStorage.removeItem("user")
}

const authServices = {
    login,
    logout
}

export default authServices