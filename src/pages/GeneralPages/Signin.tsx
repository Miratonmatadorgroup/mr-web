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
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "@/store/useUserStore";
import authApi from "@/api/authApi";
import { CookieName, RefreshCookieName } from "@/lib/api";
import { ErrorHandler } from "@/utils/logger/errorLogger";

const Signin = () => {
  interface SigninForms {
    identifier: string;
    password: string;
  }
  const [forms, setForms] = useState({
    identifier: "",
    password: "",
  } as SigninForms);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForms((prev) => ({ ...prev, [name]: value }));
  };

  const setUserProfile = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

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
    e.preventDefault();
    if (!forms.identifier || !forms.password)
      return ErrorMessage(`All fields are required`);

    const formdata = {
      identifier: forms.identifier,
      password: forms.password,
    };

    setLoading(true);

    try {
      const res = await authApi.signInUser(formdata);
      if (res.status !== "success" || !res.data?.token)
        return ErrorMessage(res.message || "Login failed");
      Cookies.set(CookieName, res.data.token);
      Cookies.set(RefreshCookieName, res.data.refreshToken);
      const decoded = decodeToken(res.data.token);
      setUserProfile(res.data.user);
      const findRole = UserRoles.find((item) => item.role === decoded?.role);
      if (findRole) navigate(`${findRole.url}`);
    } catch (error: any) {
      ErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:overflow-hidden ">
      {loading && (
        <ModalLayout setModal={setLoading} addclas="w-fit">
          <Loader title="logging in" />
        </ModalLayout>
      )}
      <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
        <div className="hidden lg:block h-full relative pb-2 ">
          <img
            src={logo}
            className="absolute w-[6rem]  top-10 left-20 z-20 "
            alt=""
          />
          <div className="flex items-start text-white  flex-col absolute bottom-10 z-10 left-10">
            <div className="font-bold text-[40px]">Get Started with Us</div>
            <div className="text-[16px] font-light">
              Complete these easy steps to register your account.
            </div>
          </div>
          <img
            src={imageframe}
            alt="image frame"
            className={`h-[100dvh] z-0 rounded-md w-full object-cover`}
          />
        </div>
        <form
          onSubmit={signInUser}
          className="w-full flex flex-col gap-5 py-10 overflow-auto"
        >
          <div className="flex items-center lg:hidden w-full justify-center">
            <img src={logo} className="w-[8rem]" alt="" />
          </div>
          <div className="text-center border border-[var(--gray)] rounded-md lg:border-none  flex items-center gap-3 flex-col w-11/12 mx-auto py-5 ">
            <div className="font-semibold text-[var(--dark)] text-[20px]">
              Sign in to your Account
            </div>
            <div>Enter your personal data to access your account.</div>
            <div className=" mt-5 flex w-11/12 lg:w-10/12 mx-auto items-start flex-col gap-4">
              <div className="w-full">
                <FormInput
                  name="identifier"
                  value={forms.identifier}
                  onChange={handleChange}
                  type="text"
                  label="Email/Username"
                  placeholder="e.g. Raheemjohn@gmail.com"
                />
              </div>

              <div className="w-full flex items-start flex-col gap-1">
                <div className="w-full">
                  <FormInput
                    label="Password"
                    name="password"
                    value={forms.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter your password"
                  />
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
              <div className="text-center w-full">
                Don't have an account?{" "}
                <Link to={`/signup`} className="font-semibold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
