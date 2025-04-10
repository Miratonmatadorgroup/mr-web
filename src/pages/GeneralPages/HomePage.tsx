import React from 'react'
import HeroSection from '../../components/generalComponents/HeroSection'
import GeneralPageLayout from '../../components/generalComponents/GeneralPageLayout'
import WhoWeAre from '../../components/generalComponents/WhoWeAre'
import Solutions from '../../components/generalComponents/Solutions'
import WhoWeServe from '../../components/generalComponents/WhoWeServe'
import WhyChooseUs from '../../components/generalComponents/WhyChooseUs'

const HomePage = () => {
  return (
    <GeneralPageLayout>
      <HeroSection />
      <div id="who_we_are" className="w-11/12 mx-auto">
        <WhoWeAre />
      </div>
      <div id="solutions" className='overflow-hidden mx-w-lg'>
        <Solutions />
      </div>
      <div id="why_choose_us">
        <WhyChooseUs />
      </div>
      <div id="who_we_serve">
        <WhoWeServe />
      </div>
    
    </GeneralPageLayout>
  )
}
export default HomePage