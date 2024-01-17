import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    } else {
      navigate("/login");
    }
  });
  return <div>Main</div>;
};

export default Main;
