import React from 'react'
import frame from "../../assets/generalImages/signup_bg.png";
import logo from "../../assets/generalImages/miraton-logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const FinishSignUp = () => {
    return (
        <div className='w-full h-screen '>
            <div className="relative h-full text-white">
                <img src={frame} className='w-full z-0 h-[100dvh] ' alt="" />
                <img src={logo} className='absolute w-[6rem]  top-10 left-20 z-20 ' alt="" />
                <div className="w-11/12 mx-auto absolute flex-col lg:flex-row left-1/2 -translate-x-1/2 bottom-10 flex lg:items-center  z-20 gap-4 lg:gap-0 lg:justify-between">
                    <div className="flex items-start flex-col  gap-1 lg:w-3/4 w-full">
                        <div className="font-bold text-[30px] lg:text-[40px]  w-full">Welcome to Miraton Rose</div>
                        <div className="text-[16px] font-light">
                            Making utility vending seamless and easy for home owners and estate managers
                        </div>
                    </div>

                    <Link to={`/user/dashboard`} className="w-[30%] cursor-pointer justify-between px-5 py-2.5 rounded-md flex  items-center  bg-white text-[var(--dark-green)]  ">
                        <div className='text-[15px] md:text-[18px]'>Go to your Dashboard</div>
                        <div className="w-fit py-2 px-3 rounded-md bg-[var(--dark-green)] text-white flex items-center justify-center ">
                            <FaArrowRightLong className='text-white' />
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default FinishSignUp