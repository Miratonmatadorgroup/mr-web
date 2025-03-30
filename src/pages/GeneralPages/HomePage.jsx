import React from 'react'
import HeroSection from '../../components/generalComponents/HeroSection'
import Services from '../../components/generalComponents/Services'

const HomePage = () => {
  return (
    <div className='w-full'>
      <HeroSection />
      <div className="w-11/12 mx-auto">
        <Services />
      </div>
    </div>
  )
}

export default HomePage