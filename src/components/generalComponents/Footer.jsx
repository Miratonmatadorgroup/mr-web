import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/generalImages/miraton-logo.png'
import { TiSocialFacebook } from "react-icons/ti";
import { GrLinkedinOption } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const company = [
        { title: 'About Us', url: "/" },
        { title: 'Careers', url: '/' },
        { title: ' FAQs', url: '/' },
        { title: ' Blog', url: '/' }
    ]
    const contacts = [
        { title: 'Shop J211 Road 5, Ikota shopping complex, VGC Ajah, Lagos.'},
        { title: 'energy @miratonmatadorgroup.com', },
        { title: '+234 912 735 3513' },
    ]

    const products = [
        { title: "Prepaid metering" },
        { title: "Access control" },
        { title: 'Solar energy' },
        { title: 'Estate management' },
    ]
    const socials = [
        { img: <TiSocialFacebook />, url: '/' },
        { img: <GrLinkedinOption />, url: '/' },
        { img: <FaXTwitter />, url: '/' }
    ]
    const legal = [
        { title: 'Terms of Service', url: '/' },
        { title: 'Privacy Policy', url: '/' },
        { title: 'Cookies', url: '/' }
    ]

    return (
        <div className='w-full text-[var(--dark)] bg-white pyH-10 '>
            <div className="w-11/12 mx-auto ">

                <div className="w-full flex lg:items-center flex-col lg:flex-row gap-10 lg:gap-0">
                    <div className="flex items-start flex-col w-full lg:w-4/12 gap-3 lg:gap-5  justify-between  ">
                        <img src={logo} alt="miraton logo" className='hidden lg:block' />
                        <div className="text-base font-bold w-10/12">Smart utilities, secure estates, sustainable energy — all in one platform.</div>
                        <div className="flex items-center gap-2">
                            {socials.map((item, i) => (
                                <Link to={item.url} target='blank' key={i} className="p-2 text-sm rounded-full bg-transparent text-[var(--dark)] border border-[var(--dark)]">{item.img}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full  grid grid-cols-1 gap-5 lg:gap-0 md:grid-cols-2 lg:grid-cols-3 lg:w-6/12 lg:ml-auto">
                        <div className="">
                            <div className="text-[20px] leading-[1.2] font-semibold">Products</div>
                            <div className="w-full flex items-start flex-col gap-3 mt-5 ">
                                {products.map((item, i) => (
                                    <div className="text-sm capitalize text-[#475569]" key={i}>{item.title}</div>
                                ))}
                            </div>
                        </div>
                        <div className="">
                            <div className="text-[20px] leading-[1.2] font-semibold">Company</div>
                            <div className="w-full flex items-start flex-col gap-3 mt-5 ">
                                {company.map((item, i) => (
                                    <Link key={i} to={item.url} className="text-sm  text-[#475569] capitalize">{item.title}</Link>
                                ))}
                            </div>
                        </div>

                        <div className="">
                            <div className="text-[20px] leading-[1.2] font-semibold">Contact</div>
                            <div className="w-full flex items-start flex-col gap-3 mt-5 ">
                                {contacts.map((item, i) => (
                                    <div key={i}  className="text-sm capitalize text-[#475569]">{item.title}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr className="w-full mt-6 mb-3 border-t border-gray-500" />
            <div className=""></div>
            <div className="flex w-11/12 mx-auto flex-col lg:flex-row lg:items-center justify-between">
                <div className="">© 2025 Miraton rose. All rights reserved.</div>
                <div className="flex items-center gap-5">
                    {legal.map((item, i) => (
                        <Link key={i} to={item.url} className="text-[var(--dark)] underline">{item.title}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer