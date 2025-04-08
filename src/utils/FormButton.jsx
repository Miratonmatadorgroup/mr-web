import React from 'react';

const FormButton = ({
  title,
  type = "submit",
  onClick,
  bg = "green",
  disabled = false,
  className = "",
}) => {
  const colorClasses = {
    green: "bg-[var(--dark-green)] hover:bg-[var(--dark-green)]/90",
    gray: "bg-[#888888] hover:bg-[#888888]/90",
  };

  const backgroundClass = colorClasses[bg] || bg;

  return (
    <button
      className={`text-white cursor-pointer w-full h-fit py-3 text-lg rounded-md ${backgroundClass} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default FormButton;