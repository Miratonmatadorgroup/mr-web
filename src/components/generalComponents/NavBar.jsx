import React, { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa";
import logo from '../../assets/generalImages/miraton-logo.png';
import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { FiPackage } from "react-icons/fi";
import { PiProjectorScreenChartLight, PiProjectorScreenChartFill } from "react-icons/pi";
import { RiArticleFill, RiArticleLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { MdConnectWithoutContact } from "react-icons/md";
import { RiErrorWarningLine, RiErrorWarningFill } from "react-icons/ri";
import { useLocation, NavLink, Link } from 'react-router-dom';
import GreenButton from './GreenButton';
import lightingimg from '../../assets/generalImages/lightning.png'

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when location changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Active icon mapping
    const getActiveIcon = (name, url) => {
        const isActive = location.pathname === url;
        const iconClass = "text-[var(--primary)]";

        switch (name) {
            case 'Home':
                return isActive ? <IoHomeSharp className={`text-2xl ${iconClass}`} /> : <IoHomeOutline className={`text-2xl ${iconClass}`} />;
            case 'About Us':
                return isActive ? <RiErrorWarningFill className={`text-2xl ${iconClass}`} /> : <RiErrorWarningLine className={`text-2xl ${iconClass}`} />;
            case 'Products':
                return <FiPackage className={`text-2xl ${iconClass}`} />;
            case 'Projects':
                return isActive ? <PiProjectorScreenChartFill className={`text-2xl ${iconClass}`} /> : <PiProjectorScreenChartLight className={`text-2xl ${iconClass}`} />;
            case 'Blog':
                return isActive ? <RiArticleFill className={`text-2xl ${iconClass}`} /> : <RiArticleLine className={`text-2xl ${iconClass}`} />;
            case 'Contact':
                return <MdConnectWithoutContact className={`text-2xl ${iconClass}`} />;
            default:
                return null;
        }
    };

    const navIcons = [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
        { name: 'Products', url: '/products' },
        { name: 'Projects', url: '/projects' },
        { name: 'Blog', url: '/blogs' },
        { name: 'Contact', url: '/contact' },
    ];

    return (
        <div className='w-full fixed top-0  z-50  bg-white'>
            {/* Main Navbar Content - Always visible */}
            <div className="w-11/12 mx-auto py-3 lg:py-5 flex items-center justify-between relative">
                <img src={logo} alt="miraton logo" className="h-12" />

                {/* Mobile menu button */}
                <div
                    className="cursor-pointer lg:hidden w-8 h-8 hover:bg-[var(--primary-light)] rounded-full flex items-center justify-center"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <IoMdClose className='text-[var(--primary)] text-4xl' />
                    ) : (
                        <FaBars className='text-[var(--primary)] text-4xl' />
                    )}
                </div>
                
                {/* Desktop Navigation */}
                <div className="lg:flex items-center gap-6 hidden">
                    {navIcons.map((nav, i) => (
                        <Link
                            to={nav.url}
                            className='uppercase text-xs text-[var(--dark)] font-bold'
                            key={i}>{nav.name}</Link>
                    ))}
                </div>
                
                {/* Desktop Buttons */}
                <div className="lg:flex items-center gap-5 hidden">
                    <button className='text-[var(--primary)] w-fit cursor-pointer'>SIGN IN</button>
                    <div className={`w-fit px-4 text-sm cursor-pointer rounded-md py-3 flex items-center justify-center bg-[var(--primary)] text-white`}>
                        <img src={lightingimg} alt="image" />
                        <div className="">Recharge Meter Now!</div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Positioned absolutely below the navbar */}
            
            {menuOpen && (
                <div className="absolute w-full  bg-white shadow-lg z-50 overflow-auto">
                    <div className="px-5 pt-5 pb-10">
                        <div className="flex flex-col gap-2">
                            {navIcons.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.url}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 p-3 rounded-lg hover:bg-[#cee6be]
                                        ${isActive ? 'bg-[var(--primary-light)] font-bold' : 'hover:bg-[#cee6be]'}`
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {getActiveIcon(item.name, item.url)}
                                    <span className={`text-lg text-[var(--primary)] ${location.pathname === item.url ? 'font-bold' : 'font-medium'}`}>
                                        {item.name}
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="flex mt-3 w-11/12 mx-auto items-center gap-3 flex-col pb-5">
                        <GreenButton text={`Login`} border={false} />
                        <GreenButton text={`Recharge Meter Now!`} image={true} src={lightingimg} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;