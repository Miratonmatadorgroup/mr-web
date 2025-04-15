import React, { useState } from 'react'
import logo from "../../assets/generalImages/miraton-logo.png";
import imageframe from "../../assets/generalImages/signin_frame.png";
import FormInput from "../../utils/FormInput";
import FormButton from '../../utils/FormButton';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordForms } from '@/types/generalPagesTypes';

const ForgotPassword = () => {
    const [screen, setScreen] = useState(1)
    const navigate = useNavigate()
    const [forms, setForms] = useState({
        email: '',
        otp: '',
        confirm_password: '',
        new_password: ''
    } as ForgotPasswordForms)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForms((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full lg:overflow-hidden h-screen ">
            <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
                <div className="hidden lg:block h-full relative pb-2 ">
                    <img src={logo} className='absolute w-[6rem]  top-10 left-20 z-20 ' alt="" />
                    <div className="flex items-start text-white  flex-col absolute bottom-10 z-10 left-10">
                        <div className="font-bold text-[40px]">Retrieve account</div>
                        <div className="text-[16px] font-light">Sign in to access the features of Miraton Rose</div>
                    </div>
                    <img src={imageframe} alt="image frame" className={`h-[100dvh] z-0 rounded-md w-full object-cover`} />
                </div>
                <div className="">
                    {screen === 1 &&
                        <div className="w-11/12 lg:h-full lg:items-center lg:justify-center mx-auto flex flex-col gap-5 py-10 overflow-auto">
                            <div className="flex items-center lg:hidden w-full justify-center">
                                <img src={logo} className='w-[8rem]' alt="" />
                            </div>
                            <div className="border border-[var(--gray)] rounded-md lg:border-none p-5 flex items-center justify-center w-full">
                                <div className="w-11/12 lg:w-10/12 mx-auto ">
                                    <div className="flex flex-col items-center w-full gap-2 text-center">
                                        <div className="font-semibold text-[var(--dark)] text-[28px]">
                                            Verify your email
                                        </div>
                                        <div>
                                            An OTP would be sent to your email.
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full items-start gap-5 mt-6">
                                        <div className="w-full">
                                            <FormInput
                                                value={forms.email}
                                                name='email'
                                                onChange={handleChange}
                                                label="Email"
                                                type='email'
                                                placeholder="eg. Raheemjohn@gmail.com" />
                                        </div>
                                        <FormButton onClick={() => setScreen(2)} type="button" title="Submit" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    }

                    {screen === 2 && (
                        <div className="w-11/12 lg:h-full lg:items-center lg:justify-center mx-auto flex flex-col gap-5 py-10 overflow-auto">
                            <div className="flex items-center lg:hidden w-full justify-center">
                                <img src={logo} className='w-[8rem]' alt="" />
                            </div>
                            <div className="border border-[var(--gray)] rounded-md lg:border-none p-5 flex items-center justify-center w-full flex-col">
                                <div className="flex flex-col items-center w-full gap-2 text-center">
                                    <div className="font-semibold text-[var(--dark)] text-[28px]">
                                        Enter the 6-Digit code
                                    </div>
                                    <div>
                                        Provide the 6 digit OTP code below.
                                    </div>
                                </div>

                                <div className="flex flex-col w-full items-start gap-5 mt-6">
                                    <div className="w-full">
                                        <FormInput
                                            name='otp'
                                            value={forms.otp}
                                            onChange={handleChange}
                                            label="OTP"
                                            placeholder="123-456" />
                                    </div>
                                    <FormButton onClick={() => setScreen(3)} type="button" title="Submit" />
                                </div>
                            </div>
                        </div>
                    )}

                    {screen === 3 && (
                        <div className="w-11/12 lg:h-full lg:items-center lg:justify-center mx-auto flex flex-col gap-5 py-10 overflow-auto">
                            <div className="flex items-center lg:hidden w-full justify-center">
                                <img src={logo} className='w-[8rem]' alt="" />
                            </div>
                            <div className="border border-[var(--gray)] rounded-md lg:border-none p-5 flex items-center justify-center w-full flex-col">
                                <div className="flex flex-col items-center w-full gap-2 text-center">
                                    <div className="font-semibold text-[var(--dark)] text-[28px]">
                                        Create new password
                                    </div>
                                    <div>
                                        Enter your new desired  password
                                    </div>
                                </div>

                                <div className="flex flex-col w-full items-start gap-6 mt-8">
                                    <div className="flex items-start flex-col gap-1 w-full">
                                        <div className="w-full">
                                            <FormInput
                                                type='password'
                                                name='new_password'
                                                value={forms.new_password}
                                                onChange={handleChange}
                                                placeholder={`enter new password`}
                                                label={`New Password`} />
                                        </div>
                                        <p className='text-[#6B6B6B]'>Must be at least 8 characters.</p>
                                    </div>
                                    <div className="w-full">
                                        <FormInput
                                            name='confirm_password'
                                            value={forms.confirm_password}
                                            onChange={handleChange}
                                            type='password'
                                            placeholder={`enter new password`}
                                            label={`Confirm New Password`} />
                                    </div>

                                    <FormButton onClick={() => navigate('/signin')} type="button" title="Submit" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword