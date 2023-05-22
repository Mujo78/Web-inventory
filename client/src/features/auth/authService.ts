import axios from "axios";

export interface LoginUser {
    username: string,
    password: string
}

const login =  async(loginData: LoginUser) => {
    const response = await axios.post("/login", loginData)

    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data))   
    }
    
    return response.data;
}

const authServices = {
    login
}

export default authServices