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
import generateReference from "@/utils/helper/generateReference";
import axios, { AxiosError } from "axios";
import ErrorLogger from "@/utils/logger/errorLogger";
import { useState } from "react";
import Input from "@/components/shared/Input";
const purchaseUrl = import.meta.env.VITE_QUICK_PURCHASE_API_URL;
const purchaseClientId = import.meta.env.VITE_QUICK_PURCHASE_CLIENT_ID;


if (!purchaseUrl) {
  throw new Error(
    "VITE_QUICK_PURCHASE_API_URL is not defined in the environment variables."
  );
}
if (!purchaseClientId) {
  throw new Error(
    "VITE_QUICK_PURCHASE_CLIENT_ID is not defined in the environment variables."
  );
}
if (!import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL) {
  throw new Error(
    "VITE_GOOGLE_SHEET_SCRIPT_URL is not defined in the environment variables."
  );
}

const QuickPurchase = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickPurchaseFormValues>({
    resolver: zodResolver(QuickPurchaseFormSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: QuickPurchaseFormValues) => {
    setIsLoading(true);
    // Generate a unique reference for the transaction
    const reference = generateReference();
    const value = data.meterNumber.replace(/[\s-]/g, ""); // Remove spaces, hyphens, and convert to lowercase
    // Generate Request Body
    const body = {
      clientId: purchaseClientId,
      webhook_url: "https://localhost:5147/purchase",
      amount: Number(data.amount) * 100, // Convert to kobo
      customerName: data.fullName,
      customerEmail: data.email,
      customerTelephone: data.phoneNumber,
      reference,
      metadata: {
        reference,
        order_id: value,
        meter_number: value,
        estate_name: data.estateName,
        created_at: new Date().toISOString(),
      },
    };

    try {
      // Create a FormData object to send the data as multipart/form-data
      const formData = new FormData();
      formData.append("reference", reference);
      formData.append("fullname", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("meterNumber", value);
      formData.append("estateName", data.estateName);
      formData.append("amount", data.amount.toString());
      formData.append("status", "Completed");
      // Persist form data in local storage
      localStorage.setItem("quickPurchaseFormData", JSON.stringify(formData));

      // Generate payment account details
      const response = await axios.post(purchaseUrl, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const {
          account_number,
          account_name,
          bank_name,
          amount,
          callback_url,
        } = response.data?.data;
        navigate(
          `/purchase?account_number=${account_number}&account_name=${encodeURIComponent(
            account_name
          )}&bank_name=${encodeURIComponent(
            bank_name
          )}&amount=${amount}&meter_number=${encodeURIComponent(
            value
          )}&callback_url=${encodeURIComponent(callback_url)}`
        );
      } else {
        ErrorLogger(`Error generating payment link: ${response.data?.message}`);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        ErrorLogger(`Error submitting form: ${error.response?.data?.message}`);
        return;
      }
      ErrorLogger(`Error submitting form: ${error}`);
    } finally {
      setIsLoading(false);
    }
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


export default QuickPurchase;
