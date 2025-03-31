import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/generalImages/miraton-white.png'
import { TiSocialFacebook } from "react-icons/ti";
import { GrLinkedinOption } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const navs = [
        { title: 'Home', url: '/' },
        { title: 'About Us', url: "/about" },
        { title: 'What we do', url: '/' },
        { title: ' to the power of 10', url: '/' },
        { title: ' donate', url: '/' }
    ]
    const legal = [
        { title: 'General Info', url: '/' },
        { title: 'privacy policy', url: "/" },
        { title: 'terms of service', url: '/' },
    ]
    const whatWeDo = [
        { title: "Encouraging Testing" },
        { title: "Strengthening Advocacy" },
        { title: 'Sharing Information' },
        { title: 'Building Leadership' },
        { title: 'Engaging With Global Fund' },
        { title: 'Shining a Light' }
    ]
    const talkToUs = [
        { title: "support@miratonroles.com" },
        { title: "+66 2399 1145" },
        { title: 'Contact Us', url: '/contact' },
    ]
    const socials = [
        { img: <TiSocialFacebook />, url: '/' },
        { img: <GrLinkedinOption />, url: '/' },
        { img: <FaXTwitter />, url: '/' }
    ]
    return (
        <div className='w-full bg-[var(--dark-green)] text-white py-10'>
            <div className="w-11/12 mx-auto flex lg:items-center flex-col gap-10">
                <div className="lg:text-center text-[26px] md:text-[30px] font-bold">POWER TO CHANGE THE FUTURE</div>
                <div className="flex items-center gap-2 text-sm">
                    <button
                        className='uppercase border-white border  rounded-md bg-transparent cursor-pointer px-4 py-2'>recharge meter</button>
                    <button className='uppercase bg-white text-[var(--primary)] px-4 py-2 cursor-pointer rounded-md '>sign up</button>
                </div>
                <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-0">
                    <div className="">
                        <div className="text-[20px] leading-[1.2] font-bold uppercase">Navigation</div>
                        <div className="w-full flex items-start flex-col gap-3 mt-5 ">
                            {navs.map((item, i) => (
                                <Link key={i} to={item.url} className="text-sm capitalize">{item.title}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <div className="text-[20px] leading-[1.2] font-bold uppercase">what we do</div>
                        <div className="w-full flex items-start flex-col gap-3 mt-5 ">
                            {whatWeDo.map((item, i) => (
                                <div className="text-sm capitalize" key={i}>{item.title}</div>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <div className="text-[20px] leading-[1.2] font-bold uppercase">legal</div>
                        <div className="w-full flex items-start flex-col gap-3 mt-5 ">
                            {legal.map((item, i) => (
                                <Link to={item.url} className="text-sm capitalize" key={i}>{item.title}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="">
                        <div className="text-[20px] leading-[1.2] font-bold uppercase">talk to us</div>
                        <div className="w-full flex flex-col gap-3 mt-5">
                            {talkToUs.map((item, i) => (
                                <React.Fragment key={i}>
                                    {item.url ? (
                                        <Link
                                            to={item.url}
                                            className="text-sm capitalize whitespace-normal break-words"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <div className="text-sm capitalize whitespace-normal break-words">
                                            {item.title}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <hr className='w-full' />
                <div className="flex items-start flex-col gap-5 lg:gap-0 md:items-center md:flex-row w-full justify-between">
                    <img src={logo} alt="miraton logo" />
                    <div className="text-sm">© 2025 Miratonrose. All Rights Reserved. </div>
                    <div className="flex items-center gap-2">
                        {socials.map((item, i) => (
                            <Link to={item.url} target='blank' key={i} className="p-2 text-sm rounded-full bg-transparent text-white border">{item.img}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer