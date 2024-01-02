import { redirect } from "react-router-dom";

const Authorized = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return redirect("/dashboard");
  }

  return null;
};

export default Authorized;
