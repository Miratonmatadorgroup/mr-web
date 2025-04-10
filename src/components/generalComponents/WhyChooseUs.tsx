import React from 'react'
import icon from '../../assets/generalImages/serve-icon.png'
import { ChooseUs } from '../../utils/pageUtils'


const WhyChooseUs = () => {

    return (
        <div className="text-[var(--dark)] py-20 w-full">
            <div className="w-full flex items-center gap-2 flex-col mb-10">
                <div className="bg-[#d7e6db] px-3 py-1.5 rounded-xl text-sm text-[var(--dark-green)]">Key Features</div>
                <div className="font-bold leading-[1.2] text-[30px] lg:text-[35px]">Why choose us?</div>
            </div>
            <div className="w-11/12 mx-auto">
                <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-5">
                    {ChooseUs.slice(0,2).map((item, i) => (
                        <div key={i} className="h-52 bg-[#f2fbf4] py-3 rounded-md px-4 flex-col flex items-start justify-between">
                            <img src={icon} alt="" />
                            <div className="flex items-start flex-col gap-1">
                                <div className="text-[var(--dark-green)] font-semibold text-[16px]">{item.title}</div>
                                <div className="text-sm">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full grid mt-5 lg:mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
                    {ChooseUs.slice(2,ChooseUs.length).map((item, i) => (
                        <div key={i} className="h-52 bg-[#f2fbf4] py-3 rounded-md px-4 flex-col flex items-start justify-between">
                            <img src={icon} alt="" />
                            <div className="flex items-start flex-col gap-1">
                                <div className="text-[var(--dark-green)] font-semibold text-[16px]">{item.title}</div>
                                <div className="text-sm">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs