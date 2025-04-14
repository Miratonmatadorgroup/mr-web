import React, { useState } from "react";
import imageframe from "@/assets/generalImages/signin_frame.png";
import FormInput from "@/utils/FormInput";
import FormButton from "@/utils/FormButton";
import GoogleButton from "@/utils/GoogleButton";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/generalImages/miraton-logo.png";
import { ErrorMessage, UserRoles } from "@/utils/pageUtils";
import ModalLayout from "@/utils/ModalLayout";
import Loader from "@/utils/Loader/Loader";
import { Apis, ClientPostApi } from "@/services/API";
import Cookies from 'js-cookie'
import { CookieName } from "@/services/API";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "@/store/useUserStore";



const Signin = () => {

  interface SigninForms {
    identifier: string;
    password: string;
  }
  const [forms, setForms] = useState({
    identifier: '',
    password: ''
  } as SigninForms)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForms((prev) => ({ ...prev, [name]: value }));
  };


  const setUserProfile = useUserStore((state) => state.setUser);
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)



  interface DecodedToken {
    role: string;
    [key: string]: any;
  }
  const decodeToken = (token: string): DecodedToken | null => {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };


  const signInUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!forms.identifier || !forms.password)
      return ErrorMessage(`All fields are required`);

    const formdata = {
      identifier: forms.identifier,
      password: forms.password,
    };

    // return console.log(Apis.user.login)
    setLoading(true);

    try {
      const res = await ClientPostApi(Apis.user.login, formdata);
      if (res.status !== 'success' || !res.data?.token)
        return ErrorMessage(res.message || 'Login failed');
      Cookies.set(CookieName, res.data.token);
      const decoded = decodeToken(res.data.token);
      setUserProfile(res.data.user)
      const findRole = UserRoles.find((item) => item.role === decoded?.role);
      if (findRole) return navigate(`${findRole.url}`);

    } catch (error: any) {
      console.log(`failed to login`, error);
      return ErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full lg:overflow-hidden h-screen ">

      {loading &&
        <ModalLayout setModal={setLoading} addclas="w-fit">
          <Loader title="logging in" />
        </ModalLayout>

      }
      <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
        <div className="hidden lg:block h-full relative pb-2 ">
          <img src={logo} className='absolute w-[6rem]  top-10 left-20 z-20 ' alt="" />
          <div className="flex items-start text-white  flex-col absolute bottom-10 z-10 left-10">
            <div className="font-bold text-[40px]">Get Started with Us</div>
            <div className="text-[16px] font-light">Complete these easy steps to register your account.</div>
          </div>
          <img src={imageframe} alt="image frame" className={`h-[100dvh] z-0 rounded-md w-full object-cover`} />
        </div>
        <form onSubmit={signInUser}
          className="w-full h-full flex  items-center justify-center">
          <div className="text-center  flex items-center gap-3 flex-col w-full py-5 lg:py-10 ">
            <div className="font-semibold text-[var(--dark)] text-[20px]">Sign in to your Account</div>
            <div>Enter your personal data to access your account.</div>
            <div className=" mt-5 flex w-11/12 lg:w-10/12 mx-auto items-start flex-col gap-4">

              <div className="w-full">
                <FormInput
                  name="identifier"
                  value={forms.identifier}
                  onChange={handleChange}
                  type="email"
                  label="Email/Phone"
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
                <FormButton title={`Sign In`} />
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
        </form>
      </div>
    </div>
  );
};

export default Signin;
