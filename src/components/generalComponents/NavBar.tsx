import React, { useState, useEffect } from 'react';
import logo from '../../assets/generalImages/miraton-logo.png';
import { IoMdClose } from "react-icons/io";
import { useLocation,  Link, } from 'react-router-dom';
import { HiBars3BottomRight } from "react-icons/hi2";
import GreenButton from './GreenButton';


const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when location changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);



    const navIcons = [
        { name: 'Who we are', id: '#who_we_are' },
        { name: 'Solutions', id: '#solutions' },
        { name: 'Why choose us', id: '#why_choose_us' },
        { name: 'Who we serve', id: '#who_we_serve' },
        { name: 'Contact us', id: '#contact', url: '/contact' },
    ];
    const isActive = navIcons.some((nav) => location.pathname === nav.url || location.hash === nav.id);
    const [active,setActive] = useState<number>()   
    const handleNavClickSmall = (item : any) => {
        if (item.url) {
            window.location.href = item.url;
        } else {
            const element = document.querySelector(item.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setMenuOpen(false);
    };

    const handleNavClickBig = (item : any) => {
        if (item.url) {
            window.location.href = item.url;
        } else {
            const element = document.querySelector(item.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className='w-full fixed top-0  z-50  bg-white'>
            {/* Main Navbar Content - Always visible */}
            <div className="w-11/12 mx-auto py-3 flex items-center justify-between relative">
                <Link to={`/`}>
                    <img src={logo} alt="miraton logo" className="h-12" />
                </Link>

                {/* Mobile menu button */}
                <div
                    className="cursor-pointer lg:hidden w-8 h-8 hover:bg-[var(--primary-light)] rounded-full flex items-center justify-center"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <IoMdClose className='text-[var(--primary)] text-4xl' />
                    ) : (
                        <HiBars3BottomRight className='text-[var(--primary)] text-4xl' />
                    )}
                </div>

                {/* Desktop Navigation */}
                <div className="lg:flex items-center gap-6 hidden">
                    {navIcons.map((nav, i) => (
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClickBig(nav);
                            }}
                            className='text-[var(--dark)] text-sm cursor-pointer'
                            key={i}>{nav.name}</div>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="lg:flex items-center gap-5 hidden">
                    <Link to={`/signin`}><GreenButton text={'Sign in'} border={true} /></Link>
                    <Link to={`/signup`}><GreenButton text={'Get Started'} /></Link>
                </div>
            </div>

            {/* Mobile Menu - Positioned absolutely below the navbar */}

            {menuOpen && (
                <div className="absolute w-full  bg-white shadow-lg z-50 overflow-auto">
                    <div className="px-5 pt-5 pb-10">
                        <div className="flex flex-col gap-2">
                            {navIcons.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.url || "#"}
                                    className={
                                        `flex items-center gap-3 p-3 rounded-lg hover:bg-[#cee6be]
                                        ${isActive ? 'bg-[var(--primary-light)] font-bold' : 'hover:bg-[#cee6be]'}`
                                    }
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClickSmall(item);
                                    }}
                                >
                                    <span className={`text-lg text-[var(--primary)] ${location.pathname === item.url ? 'font-bold' : 'font-medium'}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex mt-3 w-11/12 mx-auto items-center gap-3 flex-col pb-5">
                        <Link to={`signin`} className={`w-full md:w-fit px-4 py-3  cursor-pointer  hover:scale-105 transition duration-500 ease-in-out flex items-center justify-center gap-2  rounded-md bg-white border text-[var(--primary)]}`}>
                            Sign in
                        </Link>
                        <Link to={`/signup`} className={`w-full md:w-fit px-4 py-3  cursor-pointer  hover:scale-105 transition duration-500 ease-in-out flex items-center justify-center gap-2  rounded-md bg-[var(--primary)]  text-white }`}>
                            Get started today
                        </Link>

                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;