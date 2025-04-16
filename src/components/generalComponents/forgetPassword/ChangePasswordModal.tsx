import authApi from "@/api/authApi";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { ErrorHandler } from "@/utils/logger/errorLogger";
import { ErrorMessage, SuccessMessage } from "@/utils/pageUtils";
import {
  changePasswordSchema,
  ChangePasswordValues,
} from "@/utils/validator/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface ChangePasswordModalProps {
  email: string;
  otp: string;
  setScreen?: (screen: number) => void;
}

export function ChangePasswordModal({ email, otp, setScreen }: ChangePasswordModalProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordValues) => {
    setLoading(true);
    try {
      const res = await authApi.changePassword(email, otp, data.password);
      if (res.error) {
        ErrorMessage(res.message || "An error occurred, please try again.");
        return;
      }
      SuccessMessage(res.message || "Password changed successfully");
      navigate("/signin");
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
      <div className="border border-[var(--gray)] rounded-md lg:border-none p-5 flex items-center justify-center w-full flex-col">
        <div className="flex flex-col items-center w-full gap-2 text-center">
          <div className="font-semibold text-[var(--dark)] text-[28px]">
            Create new password
          </div>
          <div>Enter your new desired password</div>
        </div>

        <div className="flex flex-col w-full items-start gap-6 mt-8">
          <form
            className="flex items-start flex-col gap-2 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex items-start flex-col gap-2">
              <div className="w-full text-left">
                <Input
                  {...register("password")}
                  password
                  type="password"
                  label="New Password"
                  placeholder="Enter your password"
                  error={errors.password && errors.password?.message}
                />
              </div>
            </div>
            <div className="w-full flex items-start flex-col gap-2">
              <div className="w-full text-left">
                <Input
                  {...register("confirmPassword")}
                  password
                  type="password"
                  label="Confirm New Password"
                  placeholder="Enter your password again"
                  error={
                    errors.confirmPassword && errors.confirmPassword?.message
                  }
                />
              </div>
            </div>

            <div className="w-full flex justify-center mt-2 gap-4">
              <Button
                name="Back"
                className="bg-gray-300 text-white w-full p-3 rounded-lg"
                loaderColor="#ffffff"
                type="button"
                onClick={() => {setScreen && setScreen(2)}}
                isLoading={loading}
                disabled={loading}
              />
              <Button
                name="Submit"
                className="bg-[var(--primary)] text-white w-full p-3 rounded-lg"
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
