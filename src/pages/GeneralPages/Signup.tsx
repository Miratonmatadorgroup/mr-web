import React, { useState } from "react";
import imageframe from "../../assets/generalImages/signin_frame.png";
import FormInput from "../../utils/FormInput";
import CustomSelect from "../../utils/CustomSelect";
import FormButton from "../../utils/FormButton";
import GoogleButton from "../../utils/GoogleButton";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/generalImages/miraton-logo.png";


const Signin = () => {
  const [screen, setScreen] = useState(1);
  const [forms, setForms] = useState({
    firstName: "",
    lastName: "",
    email: "",
    otp: '',
    password: "",
    role: '',
    estate: "",
    houseAddress: "",
    meter_number: ''
  });

  const navigate = useNavigate()
  const roleOptions = ["Homeowner", "Estate Manager"];
  const estateOptions = ["Ajao", "Ikotun", "Ikorodu", "Ikeja", "Victoria Island", "Lekki"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForms((prev) => ({ ...prev, [name]: value }));
  }

  

  return (
    <div className="w-full h-screen ">
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
        <div className="w-full h-full overflow-y-scroll  scrollbar-hidden flex items-start justify-center">
          <div className={`w-full flex flex-col items-center ${screen === 2 || screen === 3 && 'justify-center h-full'} py-10 gap-3`}>

            {screen === 1 && (
              <>
                <div className="font-semibold text-[var(--dark)] text-[20px]">
                  Sign Up Account
                </div>
                <div>Enter your personal data to create your account.</div>
                <div className="mt-5 flex w-11/12 lg:w-10/12 mx-auto items-start flex-col gap-4">

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
                      <FormInput value={forms.lastName} name="lastName" label="Last Name" placeholder="e.g John" />
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
                    <p className="text-sm text-gray-600">
                      Must be at least 8 characters.
                    </p>
                  </div>

                  <div className="w-full">
                    <FormButton
                      onClick={() => setScreen(2)}
                      type="button"
                      title="Sign Up"
                    />
                  </div>
                </div>

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
              </>
            )}

            {screen === 2 && (
              <div className="h-[70dvh] w-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-1/2 flex items-center justify-center ">
                  <div className="w-11/12 lg:w-10/12 max-w-md h-fit mx-auto">
                    <div className="flex flex-col items-center w-full gap-2 text-center">
                      <div className="font-semibold text-[var(--dark)] text-[28px]">
                        Verify your email
                      </div>
                      <div>
                        An OTP has been sent to your mail, kindly provide it here.
                      </div>
                    </div>

                    <div className="flex flex-col w-full items-start gap-5 mt-6">
                      <div className="w-full">
                        <FormInput
                          value={forms.otp}
                          name="otp"
                          onChange={handleChange}
                          label="OTP" placeholder="123-456" />
                      </div>
                      <FormButton onClick={() => setScreen(3)} type="button" title="Verify" />
                    </div>
                  </div>
                </div>
              </div>

            )}

            {screen === 3 &&
              <>
                <div className="h-[70dvh] overflow-hidden  flex items-center justify-center w-full">
                  <div className="w-10/12 mx-auto">
                    <div className="flex items-center flex-col">
                      <div className="font-semibold text-[var(--dark)] text-[20px]">Complete your details</div>
                      <div className="text-center">Enter your resiidential information to use  services tailored for you</div>
                    </div>
                    <div className="mt-10 flex w-full mx-auto items-start flex-col gap-5">
                      <div className="w-full">
                        <FormInput
                          value={forms.houseAddress}
                          name="houseAddress"
                          onChange={handleChange}
                          label="House address"
                          placeholder="enter your house address" />

                      </div>
                      <CustomSelect
                        label={`Select estate`}
                        options={estateOptions}
                        onSelect={(value) => setForms({ ...forms, estate: value })}
                      />

                      <div className="w-full">
                        <FormInput
                          value={forms.meter_number}
                          name="meter_number"
                          onChange={handleChange}
                          label="Prepaid meter number"
                          placeholder="enter your prepaid meter number" />

                      </div>
                      <FormButton
                        type="button"
                        title={`Continue`}
                        bg="gray"
                        onClick={() => navigate('/finish_up')} />
                    </div>
                  </div>
                </div>
              </>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
