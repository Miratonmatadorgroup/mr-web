import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { PageLayoutProps } from '@/types/generalPagesTypes';
import Header from '@/components/authComponents/Header';
import SideBar from '@/components/authComponents/SideBar';

const AuthPageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const animationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.style.opacity = '0';
    }
    anime({
      targets: animationRef.current,
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutQuad',
      delay: 400,
    });
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[20%] border-r-2 border-r-[#e7e7e7] overflow-y-auto hidden md:block">
          <SideBar />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;