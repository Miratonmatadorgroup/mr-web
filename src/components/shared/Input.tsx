import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  password?: boolean;
  type?: string;
  label?: string;
  placeholder?: string;
  error?: string | boolean;
  required?: boolean;
  name: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}
const Input = ({
  password,
  type = "text",
  label,
  placeholder,
  error,
  required = false,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700 relative">
      <label className="block mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {password ? (
        <>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 bg-[#f5f5f5] focus-within:outline-none focus:outline-none focus:ring-0 border-transparent
            outline-none focus-border-none text-base
            focus:border-none rounded"
            placeholder={placeholder}
            required={required}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-[50px] transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEye size={20} className="cursor-pointer" />
            ) : (
              <FiEyeOff size={20} className="cursor-pointer" />
            )}
          </button>
        </>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          className={`border border-gray-200 p-2 rounded-md w-full ${
            error ? "border-red-500" : ""
          }`}
          {...props}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
