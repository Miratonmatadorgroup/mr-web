import React, { useEffect, useRef } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import anime from 'animejs'
import { MoveToTop } from '../../utils/pageUtils'
import { useLocation } from 'react-router-dom'

const GeneralPageLayout = ({ children }) => {
    const animationRef = useRef(null)
    
    useEffect(() => {
      if (animationRef.current) {
        animationRef.current.style.opacity = 0;
      }
      anime({
        targets: animationRef.current,
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeInOutQuad',
        delay: 600
      });
    }, [])

    return (
        <div 
          ref={animationRef}
          className='flex flex-col min-h-screen w-full gap-10 overflow-x-hidden'
          style={{ position: 'relative' }}
        >
            <NavBar />
            
            {/* Main Content Area - Critical Fixes Here */}
            <main className="flex-grow w-full text-white relative z-10">
              <div className="w-full h-full">
                {children}
              </div>
            </main>
            
            <Footer />
        </div>
    )
}

export default GeneralPageLayout