import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../slices/userslice";

const LoggedIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token === "" || !token) {
      navigate("/login");
    } else {
      dispatch(loginUser({ token, username }));
      navigate("/home");
    }
  }, []);

  return (
    <div className="bg-white">
      <Outlet />
    </div>
  );
};

export default LoggedIn;
