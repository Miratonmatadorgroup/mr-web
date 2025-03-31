import React from 'react'
import GreenButton from './GreenButton'
import mapImg from '../../assets/generalImages/mapbase.png'

const HeroSection = () => {
    return (
        <div className='w-full pb-10 mt-16 bg-[var(--dark-green)] '>
            <div className="w-full  ">
                <div className="w-11/12 mx-auto  pt-20 flex flex-col items-center gap-10 text-center">
                    <div className="font-bold leading-[1.2] lg:w-10/12  mx-auto text-[35px] w-full lg:text-[50px]">Smart Utilities, Secure Estates, Sustainable Energy. All in One Platform</div>
                    <div className="lg:w-8/10 w- mx-auto text-[15px]">We deliver cutting-edge prepaid metering, estate management technology, and renewable energy solutions — empowering communities, estates, and utilities to manage resources, control access, and optimize consumption with ease.</div>
                    <GreenButton text={`Get started today`} className={`!text-xl !py-3 hover:scale-105 transition duration-500 ease-in-out`} border={true}/>
                    <div className="w-full  ">
                        <img src={mapImg} alt="" className='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection