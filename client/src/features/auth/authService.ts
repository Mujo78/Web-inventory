import axios from "axios";

export interface LoginUser {
  username: string;
  password: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const login = async (loginData: LoginUser) => {
  const response = await axios.post("/api/login", loginData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const changePassword = async (
  token: string,
  passwordsData: IChangePassword
) => {
  const response = await axios.put("/api/change-password", passwordsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authServices = {
  login,
  changePassword,
  logout,
};

export default authServices;
