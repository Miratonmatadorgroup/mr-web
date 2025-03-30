import React, { useEffect, useRef } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import anime from 'animejs'
import { MoveToTop } from '../../utils/pageUtils'
import { useLocation } from 'react-router-dom'

const GeneralPageLayout = ({ children }) => {
    const location = useLocation()
    const animationRef = useRef(null)
    // function to animate display with a delay on mount/view
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
      MoveToTop() //makes each page to start from atop
    }, [location.pathname])
    return (
        <div 
        ref={animationRef}
        className='flex items-start flex-col gap-10'>
            <NavBar />
            <div className="w-11/12 mx-auto">{children}</div>
            <Footer/>
        </div>
    )
}

export default GeneralPageLayout