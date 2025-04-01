import React, { useState } from 'react'
import { Corecomponents } from '../../utils/pageUtils'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import coreImg from '../../assets/generalImages/solutions.png'
import bgframe from '../../assets/generalImages/solutionsframe.png'
import SimpleSlider from './Slider'


const Solutions = () => {
  const [active, setActive] = useState(0)
  const classN = `font-bold leading-[1.2] text-[30px] lg:text-[35px] text-white`

  const selectComponent = (i) => {
    setActive(active === i ? null : i)
  }

  return (
    <div className="w-full relative min-h-[80vh] md:h-fit py-10 md:py-20 bg-cover bg-center" style={{ backgroundImage: `url(${bgframe})` }}>
      <div className="w-11/12 mx-auto">
        {/* Desktop View */}
        <div className="md:flex w-full items-center hidden flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className={`${classN} mb-10`}>Our Core Solutions</div>
            <div className="flex flex-col gap-3">
              {Corecomponents.map((item, i) => (
                <div
                  key={i}
                  className="w-full rounded-md px-5 bg-[#0a2914] py-2.5 text-white"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer gap-3"
                    onClick={() => selectComponent(i)}
                  >
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-[var(--primary)] text-white text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-grow text-[16px] lg:text-[20px] font-bold">
                      {item.title}
                    </div>
                    <div className="flex-shrink-0">
                      <div className={`transition-transform duration-300 ${active === i ? "rotate-180" : ""}`}>
                        {active === i ? (
                          <IoChevronUpOutline className="text-xl text-white" />
                        ) : (
                          <IoChevronDownOutline className="text-xl text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${active === i ? "opacity-100 translate-y-0 mt-3" : "opacity-0 -translate-y-2 h-0"}`}
                  >
                    {active === i && (
                      <ul className="flex flex-col gap-2 pl-14 list-disc">
                        {item.subs.map((sub, k) => (
                          <li className="text-[16px]" key={k}>{sub}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:flex md:items-center md:justify-center lg:w-1/2 order-1 lg:order-2">
            <img src={coreImg} alt="solutions" className="max-w-full h-auto" />
          </div>
        </div>

       
        <div className="md:hidden w-full ">
          <div className={`${classN} mb-5 mx-4`}>Our Core Solutions</div>
          <SimpleSlider/>
        </div>
      </div>


    </div>
  )
}

export default Solutions