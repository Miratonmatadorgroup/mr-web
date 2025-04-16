import authApi from "@/api/authApi";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { cn } from "@/utils/cn";
import { ErrorHandler } from "@/utils/logger/errorLogger";
import { ErrorMessage } from "@/utils/pageUtils";
import { sendOtpSchema, SendOtpValues } from "@/utils/validator/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SendTokenModalProps {
  setScreen: (screen: number) => void;
  setEmail: (email: string) => void;
}

export function SendTokenModal({ setScreen, setEmail }: SendTokenModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpValues>({
    resolver: zodResolver(sendOtpSchema),
  });

  const goToVerifyPage = async (data: SendOtpValues) => {
    setLoading(true);
    try {
      const res = await authApi.forgetPassword(data.email);
      if (res.status !== 'success') {
        ErrorMessage(res.message);
        return;
      }
      setEmail(data.email);
      setScreen(2);
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 lg:h-full lg:items-center lg:justify-center mx-auto flex flex-col gap-5 py-10 overflow-auto">
      <div className="flex items-center lg:hidden w-full justify-center">
        <img
          src={"/assets/images/miraton-logo.png"}
          className="w-[8rem]"
          alt=""
        />
      </div>
      <div className="border border-[var(--gray)] rounded-md lg:border-none p-5 flex items-center justify-center w-full">
        <div className="w-11/12 lg:w-10/12 mx-auto ">
          <div className="flex flex-col items-center w-full gap-2 text-center">
            <div className="font-semibold text-[var(--dark)] text-[28px]">
              Verify your email
            </div>
            <div>An OTP would be sent to your email.</div>
          </div>

          <form
            onSubmit={handleSubmit(goToVerifyPage)}
            className="flex flex-col w-full items-start gap-5 mt-6"
          >
            <div className="w-full text-left">
              <Input
                {...register("email")}
                type="email"
                label="Email"
                placeholder="Raheemjohn@gmail.com"
                error={errors.email && errors.email?.message}
              />
            </div>

            <div className="w-full flex justify-center">
              <Button
                name="Submit"
                className={cn(
                  "text-white w-full p-3 rounded-lg bg-[var(--primary)]"
                )}
                loaderColor="#ffffff"
                type="submit"
                isLoading={loading}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
