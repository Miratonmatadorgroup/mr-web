import { motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";

declare type ButtonProps = {
  isLoading: boolean;
  className: string;
  name: string;
  loaderColor: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  isLoading,
  className,
  name,
  loaderColor,
  type,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} p-3 flex items-center justify-center text-16-semibold rounded-lg w-full max-w-80 ${
        isLoading
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:shadow-lg hover:shadow-primary/30"
      }`}
    >
      {!isLoading ? (
        <p>{name}</p>
      ) : (
        <ScaleLoader
          loading={isLoading}
          color={loaderColor}
          height={5}
          width={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </motion.button>
  );
};

export default Button;
