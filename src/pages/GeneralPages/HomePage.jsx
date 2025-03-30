import React from 'react'
import HeroSection from '../../components/generalComponents/HeroSection'
import Services from '../../components/generalComponents/Services'
import GeneralPageLayout from '../../components/generalComponents/GeneralPageLayout'

const HomePage = () => {
  return (
    <GeneralPageLayout>
      <HeroSection />
      <div className="w-11/12 mx-auto">
        <Services />
      </div>
    </GeneralPageLayout>
  )
}

export default HomePage