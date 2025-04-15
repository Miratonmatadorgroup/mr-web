import React, { useState } from 'react'
import logo from "../../assets/generalImages/miraton-logo.png";
import imageframe from "../../assets/generalImages/signin_frame.png";
import FormInput from '@/utils/FormInput';
import FormButton from '@/utils/FormButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@/utils/pageUtils';
import ModalLayout from '@/utils/ModalLayout';
import Loader from '@/utils/Loader/Loader';


const VerifyEmail = () => {

    const [forms, setForms] = useState({
        otp: '',
    })

    const location = useLocation();

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email'); // Retrieve the email parameter

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const estateOptions = ["Ajao", "Ikotun", "Ikorodu", "Ikeja", "Victoria Island", "Lekki"];



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/[^0-9]/g, "");
        const formattedValue = numericValue
            .slice(0, 6) // Limit to 6 digits
            .replace(/(\d{3})(\d{1,3})?/, (match, p1, p2) => (p2 ? `${p1}-${p2}` : p1));
        setForms((prev) => ({ ...prev, [name]: formattedValue }));

    };

    const handleOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!forms.otp) return ErrorMessage(`Otp is required`)
        if (forms.otp.length < 6) return ErrorMessage('Please enter valid code')
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            navigate(`/finish_up?email=${encodeURIComponent(email || "")}`)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
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
                        className="h-[100dvh]  z-0 rounded-md w-full object-cover"
                    />
                </div>

                <div className="w-full flex flex-col gap-5 py-10 overflow-auto">
                    <div className="flex items-center lg:hidden w-full justify-center">
                        <img src={logo} className='w-[8rem]' alt="" />
                    </div>
                    <form onSubmit={handleOtp} className="text-center border border-[var(--gray)] rounded-md lg:border-none  flex items-center gap-3 flex-col w-11/12 mx-auto py-5 ">
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
                                <FormButton title="Verify" />
                            </div>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default VerifyEmail