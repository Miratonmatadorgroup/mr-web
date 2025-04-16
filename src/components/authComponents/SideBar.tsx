import React, { useEffect, useState } from 'react'
import { FiHome } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { TbBulb } from "react-icons/tb";
import { LuHistory } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import ModalLayout from '@/utils/ModalLayout';
import { FaCoins } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import Cookies from 'js-cookie';
import { CookieName } from '@/services/API';
import { useUserStore } from '@/store/useUserStore';



export const sidebarNavItems = [
    {
        name: "Home", icon: <FiHome className='text-lg' />,
        url: '/user/dashboard',
        main:'/user/dashboard/notifications'
    },
    {
        name: "Fund Wallet", icon: <LuWallet className='text-lg' />,
        url: '/user/fund_wallet'
    },
    {
        name: "Utilities", icon: <MdDashboard className='text-lg' />,
        other: [
            { name: "Vend Utility", icon: <TbBulb className='text-lg' />, url: '/user/vend_utility' },
            { name: "Service Charge", icon: <FaCoins className='text-lg' />, url: '/user/service_charge' },
        ],
        main:''
    },
    {
        name: "History", icon: <LuHistory className='text-lg' />,
        url: '/user/history',
        main: '/user/history/'
    },
    {
        name: "Profile", icon: <FiUser className='text-lg' />,
        url: '/user/profile',
        main:""
    },
    {
        name: "Help", icon: <MdHelpOutline className='text-lg' />,
        url: '/user/help',
        main:''
    },
]
const SideBar = () => {
    

    const location = useLocation()
    const pathName = location.pathname
    const [confirmlogout, setConfirmLogout] = useState(false)

    // State to track which menu item is expanded
    const [openUtilities, setOpenUtilities] = useState(false)

    // Detect if we're on a utilities page to keep the submenu open
    useEffect(() => {
        if (pathName.includes('/user/vend_utility') || pathName.includes('/user/service_charge')) {
            setOpenUtilities(true);
        }
    }, [pathName]);

    // Toggle the utilities submenu
    const toggleUtilities = (e: any) => {
        e.preventDefault();
        setOpenUtilities((prev) => !prev);
    }

    const logout = useUserStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove(CookieName); 
        logout(); // clear user state and localStorage
        navigate('/signin'); // redirect to login screen
    };

    return (
        <div className='w-full h-full flex flex-col items-start justify-between'>

            {confirmlogout &&
                <ModalLayout addclas='w-[90%] md:w-1/2  ' setModal={setConfirmLogout}>
                    <div className="w-full rounded-md p-5 bg-white">
                        <div className="text-center">Are you sure you want to logout?</div>
                        <div className="flex items-center mt-5 w-11/12 mx-auto justify-between">
                            <button
                                onClick={()=>setConfirmLogout(false)}
                                className='text-white cursor-pointer bg-red-600 rounded-md w-fit px-4 py-2'>Cancel</button>
                            <button onClick={handleLogout} className='text-white cursor-pointer bg-green-600 rounded-md w-fit px-4 py-2'>Confirm logout</button>
                        </div>
                    </div>
                </ModalLayout>
            }


            <div className="w-full p-4 flex items-start flex-col gap-3">
                {sidebarNavItems.map((item, index) => (
                    <div key={index} className="w-full">
                        {/* Main menu item */}
                        {item.other ? (
                            <div
                                className={`w-full flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-[#f5f5f5]`}
                                onClick={toggleUtilities}
                            >
                                <div className="">{item.icon}</div>
                                <div className="flex items-center justify-between w-full">
                                    <div className=" text-base font-semibold">{item.name}</div>
                                    <IoChevronDown className={`text-xl ${openUtilities ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                        ) : (
                            // Regular menu item without submenu
                            <Link
                                to={item.url}
                                className={`w-full flex items-center gap-4 p-2 rounded-md cursor-pointer ${pathName === item.url ||  (item.main && pathName.includes(item.main))? 'bg-[var(--primary)] text-white' : 'hover:bg-[#f5f5f5]'}`}
                            >
                                <div className="">{item.icon}</div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="text-base font-semibold">{item.name}</div>
                                </div>
                            </Link>
                        )}

                        {/* Submenu items - shown only for the Utilities item when open */}
                        {item.other && openUtilities && (
                            <div className="flex flex-col gap-2 pl-10 mt-1">
                                {item.other.map((subItem, subIndex) => (
                                    <Link
                                        to={subItem.url}
                                        key={subIndex}
                                        className={`w-full text-sm flex items-center gap-4 p-2 rounded-md cursor-pointer ${pathName === subItem.url ? 'bg-[var(--primary)] text-white' : 'hover:bg-[#f5f5f5] '}`}
                                    >
                                        <div className="">{subItem.icon}</div>
                                        <div className="text-base font-semibold">{subItem.name}</div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="my-5 border-t w-full border-t-[#e7e7e7] ">
                <div onClick={() => setConfirmLogout(true)} className="cursor-pointer flex p-4 text-red-600 font-semibold items-center gap-2">
                    <TbLogout2 className='text-2xl' />
                    <div className="text-base ">Logout</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar