import React, { useState } from 'react'
import frame from "../../assets/generalImages/signup_bg.png";
import logo from "../../assets/generalImages/miraton-logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormInput from '@/utils/FormInput';
import CustomSelect from '@/utils/CustomSelect';
import FormButton from '@/utils/FormButton';
import imageframe from "../../assets/generalImages/signin_frame.png";
import { ErrorMessage } from '@/utils/pageUtils';
import ModalLayout from '@/utils/ModalLayout';
import Loader from '@/utils/Loader/Loader';


const FinishSignUp = () => {
    const [screen, setScreen] = useState(1)
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        house_address: '', estate: '', meter_number: ''
    })
    const estateOptions = ["Ajao", "Ikotun", "Ikorodu", "Ikeja", "Victoria Island", "Lekki"];
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Allow only numbers for specific fields
        if (name === "meter_number") {
            const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
            setForms((prev) => ({ ...prev, [name]: numericValue }));
        } else {
            setForms((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDetails = async () => {
        if (!forms.house_address || !forms.estate || !forms.meter_number) return ErrorMessage(`All fields are required`)
        if (forms.meter_number.length < 10) ErrorMessage(`Please enter a valid meter number`)
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000))
            setScreen(2)
        } catch (error) {
            console.log(error)
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

            {screen === 1 &&
                <>
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
                        <div className="w-full  flex flex-col gap-5 py-10 overflow-auto">
                            <div className="flex items-center lg:hidden w-full justify-center">
                                <img src={logo} className='w-[8rem]' alt="" />
                            </div>
                            <div className="text-center border border-[var(--gray)] rounded-md lg:border-none  flex items-center gap-3 flex-col w-11/12 mx-auto p-5 ">
                                <div className="flex items-center flex-col">
                                    <div className="font-semibold text-[var(--dark)] text-[20px]">Complete your details</div>
                                    <div className="text-center">Enter your resiidential information to use  services tailored for you</div>
                                </div>
                                <div className="mt-10 flex w-full mx-auto items-start flex-col gap-5">
                                    <div className="w-full">
                                        <FormInput
                                            value={forms.house_address}
                                            name="house_address"
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
                                        onClick={handleDetails} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {screen === 2 && <div className="relative h-full text-white">
                <img src={frame} className='w-full z-0 h-[100dvh] ' alt="" />
                <img src={logo} className='absolute w-[6rem]  top-10 left-20 z-20 ' alt="" />
                <div className="w-11/12 mx-auto absolute flex-col lg:flex-row left-1/2 -translate-x-1/2 bottom-10 flex lg:items-center  z-20 gap-4 lg:gap-0 lg:justify-between">
                    <div className="flex items-start flex-col  gap-1 lg:w-3/4 w-full">
                        <div className="font-bold text-[28px] lg:text-[40px]  w-full">Welcome to Miraton Rose</div>
                        <div className="text-[16px] font-light">
                            Making utility vending seamless and easy for home owners and estate managers
                        </div>
                    </div>

                    <Link to={`/signin`} className="lg:w-[30%] w-fit gap-2 border cursor-pointer justify-between px-3 py-2.5 rounded-md flex  items-center  bg-white text-[var(--dark-green)]  ">
                        <div className='text-[15px] md:text-[18px]'>Login to your Dashboard</div>
                        <div className="w-fit py-2 px-3 rounded-md bg-[var(--dark-green)] text-white flex items-center justify-center ">
                            <FaArrowRightLong className='text-white' />
                        </div>
                    </Link>
                </div>

            </div>}
        </div>
    )
}

export default FinishSignUp