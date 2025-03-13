import { useState } from "react";
import axios from "axios";
import { loginUser } from "../slices/userslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../component/ui/Button";
import InputField from "../component/ui/InputField";
import { toast } from "react-toastify";
import { z } from "zod";
interface isValidUserType {
  [key: string]: null | string
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid,setIsFormValid] = useState<isValidUserType>({
    email:null,
    password:null,
  })
  const userSchema = z.object({
    email:z.string().nonempty({message:"Email cannot be empty"}).email({message:"Not a valid Email"}),
    password:z.string().nonempty({message:"Password cannot be empty"})
  })
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signinCall = async () => {
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
  }

  const submitHandler = async () => {
    setIsFormValid({...isFormValid})
    const result = userSchema.safeParse(formData);
    if(result.success){
      signinCall();
      setIsFormValid({
        email:null,
        password:null,
      })
    }else{
      const parsedError = JSON.parse(result.error.message);
      const errors = parsedError.reduce((acc : { [key: string]:string;},curr : {path : (string)[],message:string})=>{
        acc[curr.path[0]] = curr.message;
        return acc;
      },{})
      setIsFormValid({...errors})
    }

  };

  return (
    <div className="w-[400px] flex flex-col border border-blue-200 rounded-lg px-5 py-6 text-base mx-auto mt-32 shadow-all mb-2">
      <div className="mx-auto mb-4">
        <span className="text-xl">
          Log into{" "}
          <span className="text-2xl text-blue-800 font-extrabold">Pixelverse</span>
        </span>
      </div>
      <InputField
        label={"Email"}
        type="text"
        name="email"
        value={formData.email}
        errors={isFormValid}
        placeholder={"jhondoe@gmail.com"}
        handler={inputHandler}
      />
      <InputField
        label={"Password"}
        type="password"
        name="password"
        value={formData.password}
        errors={isFormValid}
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
