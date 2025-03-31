import React from 'react'
import residenceImg from '../../assets/generalImages/residenceicon.png'
import propsImg from '../../assets/generalImages/propicon.png'
import utilsImg from '../../assets/generalImages/utilsicon.png'
import renewImg from '../../assets/generalImages/renewicon.png'
import truckImg from '../../assets/generalImages/truckicon.png'
import buildImg from '../../assets/generalImages/build.png'
import bgframe from '../../assets/generalImages/serve-frame.png'
import bgsmartFrame from '../../assets/generalImages/solutionsframe.png'
import GreenButton from './GreenButton'
import { GoArrowRight } from 'react-icons/go'

const WhoWeServe = () => {

    const serveTemplates = [
        {
            img: residenceImg,
            title: 'Residential Estates & Gated Communities'
        },
        {
            img: propsImg,
            title: 'Property Developers & Estate Managers'
        },
        {
            img: utilsImg,
            title: 'Utility Providers & Municipal Authorities'
        },
        {
            img: buildImg,
            title: 'Commercial & Industrial Facilities'
        },
        {
            img: renewImg,
            title: 'Renewable Energy Investors'
        },
        {
            img: truckImg,
            title: 'Fleet & Transport Companies (EV Charging Infrastructure)'
        },
    ]
    return (
        <div className="flex items-start gap-10 flex-col">
            <div className="w-full relative py-20 bg-cover bg-center" style={{ backgroundImage: `url(${bgframe})` }}>
                <div className="w-full flex items-center gap-2 flex-col mb-10">
                    <div className="font-bold leading-[1.2] text-[30px] lg:text-[35px]">Who we serve</div>
                </div>
                <div className="w-11/12 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3 w-full mt-10">
                        {serveTemplates.map((item, i) => (
                            <div key={i} className="bg-transparent border p-3 rounded-md h-32 flex items-start flex-col justify-between">
                                <img src={item.img} alt="image icons" />
                                <div className="text-[16px] w-10/12 text-white">{item.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-11/12 mx-auto rounded-xl relative py-10 bg-cover bg-center" style={{ backgroundImage: `url(${bgsmartFrame})` }}>

                    <div className="w-11/12 mx-auto flex items-center flex-col gap-10">
                        <div className="font-semibold leading-[1.2] lg:w-[65%] text-center text-[25px] w-full lg:text-[30px]">Smart Utilities, Secure Estates, Sustainable Energy. All in One Platform</div>
                        <div className="flex w-full flex-col md:flex-row items-center justify-center gap-3">

                            <div className={`w-full md:w-fit px-4 py-3 text-[var(--primary)]   cursor-pointer  hover:scale-105 transition duration-500 ease-in-out flex items-center justify-center gap-2  rounded-md bg-white`}>
                                <div className="">Get started today</div>
                                <GoArrowRight className='text-[var(--primary)] font-bold text-2xl' />
                            </div>

                            <button className='w-full md:w-fit cursor-pointer  hover:scale-105 transition duration-500 ease-in-out px-4 py-[.7rem] rounded-md border bg-transparent'> Learn more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhoWeServe