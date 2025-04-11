import Button from "@/components/shared/Button";
import {
  QuickPurchaseFormSchema,
  QuickPurchaseFormValues,
} from "@/utils/validator/quickPurchase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineShield } from "react-icons/md";
import { TbBolt } from "react-icons/tb";
import { FaChartArea } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuickPurchase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<QuickPurchaseFormValues>({
    resolver: zodResolver(QuickPurchaseFormSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: QuickPurchaseFormValues) => {
    console.log("Form submitted", data);
    navigate("/purchase/confirmation");
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-6 gap-3">
      <section className="text-gray-950 text-center py-4">
        <h1 className="font-bold text-4xl">Quick Token Purchase</h1>
        <p className="font-medium opacity-50 text-sm">
          Need Utility tokens fast? Purchase instantly now.
        </p>
      </section>
      <section className="w-4/5 md:w-3/5 mx-auto flex items-center justify-center flex-col border border-gray-200 rounded-xl p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex items-center justify-center gap-5 flex-col"
        >
          <Input
            label="Full Name"
            placeholder="Raheem John"
            {...register("fullName")}
            error={errors.fullName && errors.fullName?.message}
          />
          <Input
            {...register("phoneNumber")}
            type="tel"
            label="Phone Number"
            placeholder="08101234567"
            error={errors.phoneNumber && errors.phoneNumber?.message}
          />
          <Input
            {...register("meterNumber")}
            label="Meter Number"
            placeholder="12345678901"
            error={errors.meterNumber && errors.meterNumber?.message}
          />
          <Input
            {...register("estateName")}
            label="Estate Name"
            placeholder="e.g. Greenfield Estate"
            error={errors.estateName && errors.estateName?.message}
          />
          <Input
            {...register("amount")}
            label="Amount"
            placeholder="min. 1000"
            error={errors.amount && errors.amount?.message}
          />
          <Input
            {...register("email")}
            type="email"
            label="Email"
            placeholder="e.g. Raheemjohn@gmail.com"
            error={errors.email && errors.email?.message}
          />
          <Button
            name="Purchase Now"
            className="bg-[var(--primary)] text-white w-full p-3 rounded-lg"
            loaderColor="#ffffff"
            type="submit"
            isLoading={isLoading}
            disabled={isSubmitting}
          />
        </form>
        <p className="text-sm font-normal text-gray-500 mt-4">
          By Purchasing, you agree to our{" "}
          <a href="/terms" className="text-[var(--primary)]">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-[var(--primary)]">
            Privacy Policy
          </a>
        </p>
      </section>
      <section className="flex flex-wrap justify-center gap-3 text-base font-bold text-black text-center mt-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>
            <MdOutlineShield />
          </span>
          <p>Secure Payment</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>
            <TbBolt />
          </span>
          <p>Instant Delivery</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>
            <FaChartArea />
          </span>
          <p>Usage Tracking</p>
        </div>
      </section>
    </section>
  );
};

interface InputProps {
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
  type = "text",
  label,
  placeholder,
  error,
  required = false,
  ...props
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
      <label className="block mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`border border-gray-200 p-2 rounded-md w-full ${
          error ? "border-red-500" : ""
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
export default QuickPurchase;
