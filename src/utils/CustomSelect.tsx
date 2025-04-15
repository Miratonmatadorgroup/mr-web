import { CustomSelectProps } from "@/types/generalPagesTypes";
import { useState } from "react";
const CustomSelect = ({ options, onSelect, label, border = false, bg = true, labeltext = 'select an option' }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full flex flex-col gap-1">
      <div className="font-medium text-sm text-gray-700 text-start">{label}</div>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${bg && 'bg-[#f5f5f5]'} ${border && 'border border-[var(--gray)]'} text-gray-700 cursor-pointer font-medium rounded-lg text-sm px-4 py-3 text-left flex justify-between items-center focus:outline-none`}
      >
        {selected || labeltext}
        <svg
          className={`w-3 h-3  transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm z-10">
          <ul className="py-2 text-sm text-gray-700">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(option)}
                  className="block w-full text-left px-4  cursor-pointer py-2 hover:bg-gray-100"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
