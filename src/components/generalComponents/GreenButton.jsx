import React from 'react'

const GreenButton = ({ text, onClick, image=false,src,border=true,...props }) => {
    return (
        <div {...props} onClick={onClick} 
        className={`w-full text-sm cursor-pointer rounded-md py-5 flex items-center justify-center gap-2 ${border ? 'bg-[var(--primary)] text-white':'border border-[var(--primary)] text-[var(--primary)]'}`}>
           { image && <img src={src} alt="image" />}
            <div className="">{text}</div>
        </div>
    )
}

export default GreenButton