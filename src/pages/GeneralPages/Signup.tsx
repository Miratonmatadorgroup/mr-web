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


const Signin = () => {
  const [screen, setScreen] = useState(1);
  const [forms, setForms] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
    role: '',
  });

  const navigate = useNavigate()
  const roleOptions = ["Homeowner", "Estate Manager"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForms((prev) => ({ ...prev, [name]: value }));
  }

  const [loading, setLoading] = useState<boolean>(false)


  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const signUpUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reqfields = [forms.firstName, forms.lastName, forms.email, forms.password, forms.role, forms.confirm_password];
    if (reqfields.some((field) => !field)) {
      return ErrorMessage(`All fields are required`);
    }

    if (!isValidPassword(forms.password)) {
      return ErrorMessage('Password must contain at least 1 Uppercase,lowercase,number, and special character')
    }

    if (forms.confirm_password !== forms.password) {
      return ErrorMessage(`Password(s) mismatch`);
    }

    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      navigate(`/verify_email?email=${encodeURIComponent(forms.email)}`)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen ">

      {loading &&
        <ModalLayout setModal={setLoading} addclas="w-fit">
          <Loader title="processing" />
        </ModalLayout>

      }
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

        {/* LEFT SIDE IMAGE PANEL */}
        <div className="hidden h-full lg:block relative">
          <img src={logo} className='absolute w-[6rem]  top-10 left-20 z-20 ' alt="" />
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
            <img src={logo} className='w-[8rem]' alt="" />
          </div>
          <div className="text-center border border-[var(--gray)] rounded-md lg:border-none  flex items-center gap-3 flex-col w-11/12 mx-auto py-5 ">
            <div className="font-semibold text-[var(--dark)] text-[20px]">
              Sign Up Account
            </div>
            <div>Enter your personal data to create your account.</div>
            <form onSubmit={signUpUser} className="mt-5 flex w-11/12 lg:w-10/12 mx-auto items-start flex-col gap-4">

              <div className="flex items-center flex-col lg:flex-row text-[var(--dark)] justify-between gap-5 w-full">
                <div className="w-full">
                  <FormInput
                    value={forms.firstName}
                    name="firstName"
                    label="First Name"
                    placeholder="e.g Raheem"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <FormInput
                    value={forms.lastName}
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    placeholder="e.g John" />
                </div>
              </div>


              <CustomSelect
                options={roleOptions}
                onSelect={(value) => setForms({ ...forms, role: value })}
                label={`Select Role`}
              />


              <div className="w-full">
                <FormInput
                  value={forms.email}
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  placeholder="e.g. Raheemjohn@gmail.com"
                />
              </div>

              <div className="w-full flex items-start flex-col gap-2">
                <div className="w-full">
                  <FormInput
                    value={forms.password}
                    name="password"
                    onChange={handleChange}
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <p className="text-xs text-gray-600">
                  Must be at least 8 characters.
                </p>
              </div>
              <div className="w-full flex items-start flex-col gap-2">
                <div className="w-full">
                  <FormInput
                    value={forms.confirm_password}
                    name="confirm_password"
                    onChange={handleChange}
                    label="Confirm Password"
                    type="password"
                    placeholder="Enter your password again"
                  />
                </div>

              </div>

              <div className="w-full">
                <FormButton
                  title="Sign Up"
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
