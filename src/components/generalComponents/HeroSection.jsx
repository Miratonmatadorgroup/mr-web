import React from 'react'
import NavBar from './NavBar'
import GreenButton from './GreenButton'
import smalltopImage from '../../assets/generalImages/small-eclipse1.png'
import smalltopRightImage from '../../assets/generalImages/small-eclipse2.png'
import smallbottomleftImage from '../../assets/generalImages/small-eclipse3.png'
import bigtopImage from '../../assets/generalImages/big-eclipsetop.png'
import bigbottomImage from '../../assets/generalImages/big-eclipsedown.png'
import discoverImage from '../../assets/generalImages/discover.png'
import shadowImage from '../../assets/generalImages/shadow.png'

const HeroSection = () => {
    return (
        <div className='w-full'>
            <NavBar />
            <div
                style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
                className="w-11/12 mx-auto  rounded-md overflow-hidden relative bg-white h-fit py-10 px-5 mt-[6rem]  ">

                <img
                    src={smalltopImage}
                    alt=""
                    className="absolute top-0 left-0 z-0 w-[250px] lg:hidden"
                />
                <img
                    src={smalltopRightImage}
                    alt=""
                    className="absolute top-1/3 right-0 z-0 w-[80px] lg:hidden"
                />
                <img
                    src={smallbottomleftImage}
                    alt=""
                    className="absolute bottom-0 left-0 z-0 w-[140px] lg:hidden"
                />

                <img
                    src={bigtopImage}
                    alt=""
                    className="absolute top-0 left-0 z-0 w-[200px] hidden lg:block"
                />
                <img
                    src={bigbottomImage}
                    alt=""
                    className="absolute bottom-0 right-0 z-0 w-[300px] hidden lg:block"
                />
                <img
                    src={shadowImage}
                    alt=""
                    className="absolute bottom-5 right-5 z-5 w-[250px] hidden lg:block"
                />

                <div className="w-full lg:h-[40rem] lg:flex items-center justify-start   relative overflow-hidden">

                    <div className="flex flex-col w-full lg:w-1/2 lg:mt-16 items-center lg:pl-10 lg:items-start  gap-5 relative z-10">
                        <h1 className="text-[var(--primary)] leading-[100%] text-[30px] w-11/12 text-center lg:text-start font-semibold">
                            Power to Change the Future
                        </h1>
                        <p className="text-center tracking-widest lg:tracking-normal leading-[30px] lg:text-start">
                            Miratonrose is a fully-integrated renewable energy company, focused on the development, acquisition and long-term ownership of projects across the globe and has been developing, constructing and/or operating renewable energy transmission, and energy storage projects in Nigeria since 2011
                        </p>
                        <div className="w-10/12 lg:hidden">
                            <GreenButton text="Discover Miratonrose" />
                        </div>
                        <div className="w-2/4 lg:block hidden">
                            <GreenButton text="Discover Miratonrose" image={true} src={discoverImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection