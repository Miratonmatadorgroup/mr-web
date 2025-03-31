import React from 'react'


const Services = () => {
    // const services = [
    //     {
    //         icon: serviceImg1,
    //         title: 'Manufacturing',
    //         desc: 'We offer a full service from a to z, top quality products with spot on deadlines.'
    //     },
    //     {
    //         icon: serviceImg2,
    //         title: 'Energy Engineering',
    //         desc: 'We finish all our projects on time and go through with rigorous testing before project delivery.'
    //     },
    //     {
    //         icon: serviceImg3,
    //         title: 'Material Engineering',
    //         desc: 'Top of the line machinery, highly educated employees and great working environment.'
    //     },
    // ]
    return (
        <div className='w-full py-20'>
            <div className="text-[20px] lg:text-[40px] font-bold solid">Our Services & Solutions</div>
            <div className="lg:mt-20 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative">
                {/* {services.map((item, i) => {
                    const isEven = i % 2 === 0
                    return (
                        <div
                            className={`w-full bg-white transition duration-500 ease-in-out px-5 rounded-md cursor-pointer relative pt-10 pb-5 flex items-start flex-col gap-3 hover:scale-105`}
                            style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
                        >
                            <div className="absolute -top-5 left-5 p-2 bg-[var(--primary)]">
                                <img src={item.icon} alt="icon" className='' />
                            </div>
                            <div className="text-[var(--dark-green)] font-semibold">{item.title}</div>
                            <div className="">{item.desc}</div>
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default Services