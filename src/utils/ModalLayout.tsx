import { ModalLayoutProps } from '@/types/authPagesTypes';
import React, { useEffect, useRef } from 'react';



const ModalLayout: React.FC<ModalLayoutProps> = ({ children, setModal, addclas }) => {
    const refdiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (refdiv.current && !refdiv.current.contains(e.target as Node)) {
                setModal(false);
            }
        };

        window.addEventListener('click', handleClickOutside, true);

        return () => {
            window.removeEventListener('click', handleClickOutside, true);
        };
    }, [setModal]);

    return (
        <div className="w-full z-50 h-screen fixed bg-[var(--dark)]/30 flex top-0 left-0 items-center justify-center  backdrop-blur-sm">
            <div ref={refdiv} className={`${addclas} max-h-[90dvh] overflow-y-auto`}>
                {children}
            </div>
        </div>
    );
};

export default ModalLayout;