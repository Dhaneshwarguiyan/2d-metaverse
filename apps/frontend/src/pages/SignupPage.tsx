import { useState } from "react";
import axios from "axios";
import InputField from "../component/ui/InputField";
import Button from "../component/ui/Button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface isValidUserType {
  [key: string]: null | string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [ isFormValid,setIsFormValid ] = useState<isValidUserType>({
    firstName:null,
    lastName:null,
    username:null,
    email:null,
    password:null
  })
  // console.log(isFormValid)
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const userSchema = z.object({
    firstName:z.string().min(3,{message:"first name should be 3-10 character long"}).max(10,{message:"first name should be 3-10 character long"}),
    lastName:z.string().min(3,{message:"last name should be 3-10 character long"}).max(10,{message:"last name should be 3-10 character long"}),
    username:z.string().min(3,{message:"username should be 3-10 character long"}).max(10,{message:"username should be 3-10 character long"}),
    email:z.string().email({message:"Not a valid email"}),
    password:z.string().min(8,{message:"Password should be greater than 8 characters"})
  });

  const signupCall = async ()=>{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/users/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      );
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async () => {
    const result = userSchema.safeParse(formData);
    if(result.success){
        signupCall();
        setIsFormValid({
          firstName:null,
          lastName:null,
          username:null,
          email:null,
          password:null
        })
    }else{
      const parsedError = JSON.parse(result.error.message);
      const errors = parsedError.reduce((acc:{[x: string]:string},curr:{path: (string | number)[],message:string})=>{
        acc[curr.path[0]] = curr.message;
        return acc;
      },{})
      setIsFormValid({...errors})
    }

  };

  return (
    <div className="w-[500px] flex flex-col border border-blue-200 rounded-lg px-5 py-6 text-sm mx-auto mt-32 shadow-all mb-2">
      <div className="mx-auto mb-4">
        <span className="text-3xl">
          Signup into{" "}
          <span className="text-4xl text-blue-800 font-extrabold">Pixelverse</span>
        </span>
      </div>
      <InputField
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        errors={isFormValid}
        placeholder="username"
        handler={inputHandler}
      />
      <InputField
        label="firstname"
        type="text"
        name="firstName"
        value={formData.firstName}
        errors={isFormValid}
        placeholder="firstname"
        handler={inputHandler}
      />
      <InputField
        label="lastname"
        type="text"
        name="lastName"
        value={formData.lastName}
        errors={isFormValid}
        placeholder="lastname"
        handler={inputHandler}
      />
      <InputField
        label="email"
        type="email"
        name="email"
        value={formData.email}
        errors={isFormValid}
        placeholder="jhondoe@gmail.com"
        handler={inputHandler}
      />
      <InputField
        label="password"
        type="password"
        name="password"
        value={formData.password}
        errors={isFormValid}
        placeholder="password"
        handler={inputHandler}
      />
      <span onClick={submitHandler} className="mx-auto mt-4">
        <Button text="Submit" type="primary" />
      </span>
    </div>
  );
};

export default SignupPage;
