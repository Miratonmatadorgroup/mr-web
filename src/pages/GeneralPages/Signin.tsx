import React, { useState } from "react";
import imageframe from "@/assets/generalImages/signin_frame.png";
import FormInput from "@/utils/FormInput";
import FormButton from "@/utils/FormButton";
import GoogleButton from "@/utils/GoogleButton";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/generalImages/miraton-logo.png";



const Signin = () => {

  interface SigninForms {
    email: string;
    password: string;
  }
  const [forms, setForms] = useState({
    email: '',
    password: ''
  } as SigninForms)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForms((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate()
  return (
    <div className="w-full lg:overflow-hidden h-screen ">
      <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
        <div className="hidden lg:block h-full relative pb-2 ">
          <img src={logo} className='absolute w-[6rem]  top-10 left-20 z-20 ' alt="" />
          <div className="flex items-start text-white  flex-col absolute bottom-10 z-10 left-10">
            <div className="font-bold text-[40px]">Get Started with Us</div>
            <div className="text-[16px] font-light">Complete these easy steps to register your account.</div>
          </div>
          <img src={imageframe} alt="image frame" className={`h-[100dvh] z-0 rounded-md w-full object-cover`} />
        </div>
        <div className="w-full h-full flex  items-center justify-center">
          <div className="text-center  flex items-center gap-3 flex-col w-full py-5 lg:py-10 ">
            <div className="font-semibold text-[var(--dark)] text-[20px]">Sign in to your Account</div>
            <div>Enter your personal data to access your account.</div>
            <div className=" mt-5 flex w-11/12 lg:w-10/12 mx-auto items-start flex-col gap-4">

              <div className="w-full">
                <FormInput
                  name="email"
                  value={forms.email}
                  onChange={handleChange}
                  type="email"
                  label="Email"
                  placeholder="e.g. Raheemjohn@gmail.com" />
              </div>

              <div className="w-full flex items-start flex-col gap-1">
                <div className="w-full">
                  <FormInput
                    label="Password"
                    name="password"
                    value={forms.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter your password" />
                </div>
                <div className="w-fit ml-auto">
                  <Link to={`/forgot_password`}>forgot password?</Link>
                </div>
              </div>


              <div className="w-full ">
                <FormButton onClick={() => navigate('/user/dashboard')} type="button" title={`Sign In`} />
              </div>
            </div>
            <div className="flex items-center gap-4 w-11/12 lg:w-10/12 mt-2">
              <div className="w-full h-0.5 rounded-full bg-gray-100"></div>
              <div className="font-semibold">Or</div>
              <div className="w-full h-0.5 bg-gray-100 rounded-full"></div>
            </div>
            <div className="mt-6 flex items-start flex-col gap-8 lg:w-10/12 w-11/12 mx-auto">
              <GoogleButton text={`Sign up with Google`} />
              <div className="text-center w-full">Don't have an account? <Link to={`/signup`} className="font-semibold">Sign Up</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
