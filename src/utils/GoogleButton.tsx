import React from 'react'
import logo from '../assets/generalImages/google.png'

interface GoogleButtonProps {
    text: string;
    onClick?: () => void;
}
const GoogleButton = ({ text, onClick }: GoogleButtonProps) => {
    return (
        <div onClick={onClick} className='w-full bg-white border-gray-200 border px-5 cursor-pointer  py-3 rounded-md flex items-center justify-center'>
            <div className="w-11/12 mx-auto flex justify-center  items-center gap-3">
                <img src={logo} alt="google logo" />
                <div className="font-semibold">{text}</div>
            </div>
        </div>
    )
}

export default GoogleButton