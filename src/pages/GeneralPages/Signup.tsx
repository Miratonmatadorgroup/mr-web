import React, { useState } from "react";
import imageframe from "../../assets/generalImages/signin_frame.png";
import FormInput from "../../utils/FormInput";
import CustomSelect from "../../utils/CustomSelect";
import FormButton from "../../utils/FormButton";
import GoogleButton from "../../utils/GoogleButton";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/generalImages/miraton-logo.png";
import { ErrorMessage } from "@/utils/pageUtils";
import ModalLayout from "@/utils/ModalLayout";
import Loader from "@/utils/Loader/Loader";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import {
  RegisterUserSchema,
  RegisterUserValues,
} from "@/utils/validator/signUpUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import userApi from "@/api/userApi";
import authApi from "@/api/authApi";

const Signin = () => {
  const [screen, setScreen] = useState(1);
  const navigate = useNavigate();
  const roleOptions = [
    { label: "Homeowner", value: "homeOwner" },
    { label: "Estate Manager", value: "manager" },
    { label: "Tenant", value: "user" },
  ];
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserValues>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const onSubmit = async (data: RegisterUserValues) => {
    setLoading(true);
    try {
      const res = await authApi.signUpUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        role: data.role,
        userName: data.userName,
      });
      if (res.error) {
        ErrorMessage(res.message || "An error occurred, please try again.");
        return;
      }
      navigate(`/verify_email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen ">
      {loading && (
        <ModalLayout setModal={setLoading} addclas="w-fit">
          <Loader title="processing" />
        </ModalLayout>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT SIDE IMAGE PANEL */}
        <div className="hidden h-full lg:block relative">
          <img
            src={logo}
            className="absolute w-[6rem]  top-10 left-20 z-20 "
            alt=""
          />
          <div className="flex items-start text-white flex-col absolute bottom-10 z-10 left-10">
            <div className="font-bold text-[40px]">Get Started with Us</div>
            <div className="text-[16px] font-light">
              Complete these easy steps to register your account.
            </div>
          </div>
          <img
            src={imageframe}
            alt="image frame"
            className="h-[100dvh] z-0 rounded-md w-full object-cover"
          />
        </div>

        {/* RIGHT SIDE FORM PANEL */}
        <div className="w-full flex flex-col gap-5 py-10 overflow-auto">
          <div className="flex items-center lg:hidden w-full justify-center">
            <img src={logo} className="w-[8rem]" alt="" />
          </div>
          <div className="text-center border border-[var(--gray)] rounded-md lg:border-none  flex items-center gap-3 flex-col w-11/12 mx-auto py-5 ">
            <div className="font-semibold text-[var(--dark)] text-[20px]">
              Sign Up Account
            </div>
            <div>Enter your personal data to create your account.</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              className="mt-5 flex w-11/12 lg:w-10/12 mx-auto items-start flex-col gap-4"
            >
              <div className="flex items-center flex-col lg:flex-row text-[var(--dark)] justify-between gap-5 w-full">
                <div className="w-full text-left">
                  <Input
                    label="First Name"
                    placeholder="e.g Raheem"
                    {...register("firstName")}
                    error={errors.firstName && errors.firstName?.message}
                  />
                </div>
                <div className="w-full text-left">
                  <Input
                    label="Last Name"
                    placeholder="e.g John"
                    {...register("lastName")}
                    error={errors.lastName && errors.lastName?.message}
                  />
                </div>
              </div>

              <div className="w-full pt-1">
                <CustomSelect
                  options={roleOptions.map((option) => option.label)}
                  onSelect={(value) =>
                    setValue(
                      "role",
                      roleOptions.find((option) => option.label === value)
                        ?.value || ""
                    )
                  }
                  label={`Select Role`}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role?.message}
                  </p>
                )}
              </div>

              <div className="w-full text-left">
                <Input
                  {...register("email")}
                  type="email"
                  label="Email"
                  placeholder="e.g. Raheemjohn@gmail.com"
                  error={errors.email && errors.email?.message}
                />
              </div>

              <div className="w-full text-left">
                <Input
                  {...register("userName")}
                  type="text"
                  label="Username"
                  placeholder="e.g. Raheemjohn22"
                  error={errors.userName && errors.userName?.message}
                />
              </div>

              <div className="w-full flex items-start flex-col gap-2">
                <div className="w-full text-left">
                  <Input
                    {...register("password")}
                    password
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    error={errors.password && errors.password?.message}
                  />
                </div>
              </div>
              <div className="w-full flex items-start flex-col gap-2">
                <div className="w-full text-left">
                  <Input
                    {...register("confirmPassword")}
                    password
                    type="password"
                    label="Confirm Password"
                    placeholder="Enter your password again"
                    error={
                      errors.confirmPassword && errors.confirmPassword?.message
                    }
                  />
                </div>
              </div>

              <div className="w-full flex justify-center">
                <Button
                  name="Sign Up"
                  className="bg-[var(--primary)] text-white w-full p-3 rounded-lg"
                  loaderColor="#ffffff"
                  type="submit"
                  isLoading={loading}
                  disabled={loading || isSubmitting}
                />
              </div>
            </form>

            <div className="flex items-center gap-4 w-11/12 lg:w-10/12 mt-2">
              <div className="w-full h-0.5 rounded-full bg-gray-100"></div>
              <div className="font-semibold">Or</div>
              <div className="w-full h-0.5 bg-gray-100 rounded-full"></div>
            </div>

            <div className="mt-6 flex items-start flex-col gap-8 lg:w-10/12 w-11/12 mx-auto">
              <GoogleButton text="Sign up with Google" />
              <div className="text-center w-full">
                Already have an account?{" "}
                <Link to="/signin" className="font-semibold">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
