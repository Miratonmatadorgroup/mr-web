import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { cn } from "@/utils/cn";
import {
  verifyForgotPwdOtpSchema,
  VerifyForgotPwdOtpValues,
} from "@/utils/validator/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ConfirmOtpModalProps {
  setScreen: (screen: number) => void;
  setOtp: (otp: string) => void;
}

export function ConfirmOtpModal({ setScreen, setOtp }: ConfirmOtpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForgotPwdOtpValues>({
    resolver: zodResolver(verifyForgotPwdOtpSchema),
  });

  const goToCreatePassword = async (data: VerifyForgotPwdOtpValues) => {
    setOtp(data.otp);
    setScreen(3);
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
      <div className="border border-[var(--gray)] rounded-md lg:border-none p-5 flex items-center justify-center w-full flex-col">
        <div className="flex flex-col items-center w-full gap-2 text-center">
          <div className="font-semibold text-[var(--dark)] text-[28px]">
            Enter the 6-Digit code
          </div>
          <div>Provide the 6 digit OTP code below.</div>
        </div>

        <form
          onSubmit={handleSubmit(goToCreatePassword)}
          className="flex flex-col w-full items-start gap-5 mt-6"
        >
          <div className="w-full text-left">
            <Input
              {...register("otp")}
              label="OTP"
              placeholder="123-456"
              error={errors.otp && errors.otp?.message}
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
              isLoading={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
