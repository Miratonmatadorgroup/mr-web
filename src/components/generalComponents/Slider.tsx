import React from "react";
import Slider from "react-slick";
import { Corecomponents } from "../../utils/pageUtils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const sliderRef = React.useRef(null);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
    touchThreshold: 10,
    draggable: true,
    adaptiveHeight: true,
    cssEase: 'linear'
  };

  return (
    <div className="w-full  mx-auto relative" style={{ padding: '0 ' }}>
      <Slider ref={sliderRef} {...settings}>
        {Corecomponents.map((slide, index) => (
          <div key={index} className="px-2 focus:outline-none">
            <div className="w-full h-full" style={{ minHeight: '400px' }}>
              <div className="rounded-lg overflow-hidden h-full flex flex-col">
                {slide.image && (
                  <div className="flex-shrink-0 h-48 overflow-hidden">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      style={{ pointerEvents: 'none' }}
                    />
                  </div>
                )}
                <div className="flex-grow bg-[#0a2914] p-4 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-[#2a9d55] text-white text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-grow text-base text-white font-bold">
                      {slide.title}
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2 pl-6 list-disc text-white text-sm">
                    {slide.subs.map((sub, k) => (
                      <li key={k}>{sub}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}