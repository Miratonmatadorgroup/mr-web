import React from 'react'
import aboutImg from '../../assets/generalImages/about.png'
import GreenButton from './GreenButton'

const WhoWeAre = () => {
  return (
    <div className="text-[var(--dark)] py-20 w-full">
      <div className="w-full flex items-center gap-2 flex-col mb-10">
        <div className="bg-[#d7e6db] px-3 py-1.5 rounded-xl text-sm text-[var(--dark-green)]">About us</div>
        <div className="font-bold leading-[1.2] text-[30px] lg:text-[35px]">Who We Are</div>
      </div>
      <div
        className="w-full flex flex-col lg:flex-row items-center gap-5 lg:gap-10 lg:h-[512px] lg:max-h-[514px]">
        <div className="w-full lg:w-1/2 md:flex md:items-center md:justify-center">
          <img src={aboutImg} alt="" className='' />
        </div>
        <div className="w-full lg:w-1/2 lg:bg-[#f8fafc] rounded-xl py-5 lg:py-0 h-full  flex items-center lg:px-5 justify-center ">
          <div className="flex items-start flex-col gap-5">
            <div className="font-semibold text-[20px]">We are a technology-driven infrastructure company specializing in electricity, water, and gas metering, estate management platforms, access control systems, and renewable energy solutions.</div>
            <div className="text-[16px]">From prepaid metering and token vending to solar project design and diesel management, we empower utilities, property managers, and communities with the tools to manage resources efficiently, reduce waste, and drive sustainability — all with seamless digital experiences and minimal human intervention.</div>
            <GreenButton text={`Read more`} border={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoWeAre