import { useState } from "react";
import axios from "axios";
import { loginUser } from "../slices/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../component/ui/Button";
import InputField from "../component/ui/InputField";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/users/login`,
        {
          email: formData.email,
          password: formData.password,
        },
      );
      if (response) {
        toast.success(`Welcome ${response.data.username}`);
        setTimeout(() => {
          dispatch(
            loginUser({
              token: response.data.token,
              username: response.data.username,
            }),
          );
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          navigate("/home");
        }, 1000);
      }
    } catch {
      toast.error("Incorrect Credentials");
    }
  };

  return (
    <div className="w-[400px] flex flex-col border border-blue-200 rounded-lg px-5 py-6 text-base mx-auto mt-32 shadow-all mb-2">
      <div className="mx-auto mb-4">
        <span className="text-xl">
          Log into{" "}
          <span className="text-2xl text-blue-800 font-extrabold">Trek</span>
        </span>
      </div>
      <InputField
        label={"Email"}
        type="text"
        name="email"
        value={formData.email}
        placeholder={"jhondoe@gmail.com"}
        handler={inputHandler}
      />
      <InputField
        label={"Password"}
        type="password"
        name="password"
        value={formData.password}
        placeholder={"Password"}
        handler={inputHandler}
      />
      <span onClick={submitHandler} className="mx-auto mt-4">
        <Button text="Submit" type="primary" />
      </span>
    </div>
  );
};

export default LoginPage;
