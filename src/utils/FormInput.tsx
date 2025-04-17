import { FormInputProps } from "@/types/generalPagesTypes";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormInput = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = false,
  minLength,
  backbg = true,
  bold = true,
  name,
  helpText,
  errorText,
  options = [],
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderInput = () => {
    switch (type) {
      case "password":
        return (
          <div className="relative !w-full">
            <input
              type={showPassword ? "text" : "password"}
              className={`!w-full p-3 ${backbg ? 'bg-[#f5f5f5]  border-transparent  focus-border-none focus:border-none' :'bg-white border border-[var(--gray)]'} focus-within:outline-none focus:outline-none focus:ring-0
                            outline-none text-base rounded`}
              placeholder={placeholder}
              value={value}
              onChange={onChange} // Ensure onChange is passed
              name={name}
              required={required}
              minLength={minLength}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FiEyeOff size={20} className="cursor-pointer" />
              ) : (
                <FiEye size={20} className="cursor-pointer" />
              )}
            </button>
            {helpText && (
              <p className="text-sm font-bold text-gray-500 mt-1">{helpText}</p>
            )}
          </div>
        );
      case "select":
        return (
          <div className="relative">
            <select
              title="select"
              className="w-full p-2 bg-gray-50 border rounded "
              value={value}
              onChange={onChange} // Ensure onChange is passed
              name={name}
              required={required}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <>
            <input
              type={type}
              className={`!w-full p-3 ${
                backbg
                  ? "bg-[#f5f5f5]  border-transparent  focus-border-none focus:border-none"
                  : "bg-white border border-[var(--gray)]"
              } focus-within:outline-none focus:outline-none focus:ring-0
                            outline-none text-base rounded`}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              name={name}
              required={required}
              readOnly={!onChange} // Set readOnly if onChange is not provided
              minLength={minLength}
            />
            {helpText && (
              <p className="text-xs text-gray-500 mt-1">{helpText}</p>
            )}
            {errorText && (
              <p className="text-xs text-red-600 mt-1">{errorText}</p>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex items-start flex-col">
      {label && (
        <label
          className={`block text-sm capitalize mb-1 ${bold ? "font-bold" : ""}`}
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
    </div>
  );
};

export default FormInput;
