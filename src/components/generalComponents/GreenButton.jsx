import React from 'react'
import { GoArrowRight } from "react-icons/go";

const GreenButton = ({ text, onClick, arrow=false,border=false,className }) => {
    return (
        <div onClick={onClick} 
        className={`w-fit px-4 ${className} text-[var(--primary)]  text-sm cursor-pointer rounded-md  flex items-center justify-center gap-2 ${border ? ' border-[var(--primary)] border rounded-md bg-white py-2':' py-2.5 bg-[var(--primary)] text-[white]'}`}>
            <div className="">{text}</div>
           { arrow && <GoArrowRight className='text-[var(--primary)] font-bold text-2xl'/>}
        </div>
    )
}

export default GreenButton