import React from 'react'
import logo from '@/assets/generalImages/miraton-logo.png'
import userImage from '@/assets/authImages/user_image.png'
import { IoIosNotificationsOutline } from "react-icons/io";

const Header = () => {
    return (
        <div className='w-full py-4 shadow-sm bg-white'>
            <div className="w-[95%] mx-auto  flex items-center justify-between">
                <div className="">
                    <img src={logo} alt="miraton rose logo" className='w-24' />
                </div>
                <div className=" flex items-center gap-4">
                    <div className="relative">
                        <IoIosNotificationsOutline className='text-3xl cursor-pointer ' />
                        <div className="w-4 h-4 text-[10px] absolute top-0 right-0 rounded-full flex items-center justify-center font-semibold bg-[var(--primary)] text-white">4</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={userImage} alt="user image" className='cursor-pointer' />
                        <div className="flex items-start flex-col gap-1">
                            <div className="font-bold text-sm">Raheen John</div>
                            <div className="text-sm">RaheenJohn@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header