import { useCallback, useEffect, useState } from "react";
import logo from "../../assets/generalImages/miraton-logo.png";
import imageframe from "../../assets/generalImages/signin_frame.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@/utils/pageUtils";
import ModalLayout from "@/utils/ModalLayout";
import Loader from "@/utils/Loader/Loader";
import Input from "@/components/shared/Input";
import { verifyOtpSchema, VerifyOtpValues } from "@/utils/validator/verifyOtp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/Button";
import userApi from "@/api/userApi";
import { usePropertyStore } from "@/store/usePropertyStore";
import propertyApi from "@/api/propertyApi";
import { ErrorHandler } from "@/utils/logger/errorLogger";

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
  });
  const location = useLocation();
  const setProperties = usePropertyStore((state) => state.setProperties);
  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email"); // Retrieve the email parameter

  if (email) {
    setValue("email", email); // Set the email value in the form
  }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Memoize the fetchProperties function to avoid unnecessary re-creations
  const fetchProperties = useCallback(async () => {
    try {
      const res = await propertyApi.getProperties();
      if (res.data) {
        setProperties(res.data);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const onSubmit = async (data: VerifyOtpValues) => {
    setLoading(true);
    try {
      const res = await userApi.verifyOtp(data);
      if (res.error) {
        ErrorMessage(res.message || "An error occurred, please try again.");
        return;
      }
      navigate(`/finish_up?email=${encodeURIComponent(email || "")}`);
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen ">
      {loading && (
        <ModalLayout setModal={setLoading} addclas="w-fit">
          <Loader title="processing" />
        </ModalLayout>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* LEFT SIDE IMAGE PANEL */}
        <div className="hidden h-full lg:block relative">
          <img
            src={logo}
            className="absolute w-[6rem]  top-10 left-20 z-20 "
            alt=""
          />
          <div className="flex items-start text-white flex-col absolute bottom-10 z-10 left-10">
            <div className="font-bold text-[40px]">Get Started with Us</div>
            <div className="text-[16px] font-light">
              Complete these easy steps to register your account.
            </div>
          </div>
          <img
            src={imageframe}
            alt="image frame"
            className="h-[100dvh]  z-0 rounded-md w-full object-cover"
          />
        </div>

        <div className="w-full flex flex-col gap-5 py-10 overflow-auto">
          <div className="flex items-center lg:hidden w-full justify-center">
            <img src={logo} className="w-[8rem]" alt="" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center border border-[var(--gray)] rounded-md lg:border-none  flex items-center gap-3 flex-col w-11/12 mx-auto py-5 "
          >
            <div className="w-11/12 lg:w-10/12 max-w-md h-fit mx-auto">
              <div className="flex flex-col items-center w-full gap-2 text-center">
                <div className="font-semibold text-[var(--dark)] text-[28px]">
                  Verify your email
                </div>
                <div>
                  An OTP has been sent to your mail, kindly provide it here.
                </div>
              </div>

              <div className="flex flex-col w-full items-center gap-5 mt-6">
                <div className="w-full text-left">
                  <Input
                    {...register("otp")}
                    label="OTP"
                    placeholder="123-456"
                    error={errors.otp && errors.otp?.message}
                  />
                </div>
                <Button
                  name="Verify"
                  className="bg-[var(--primary)] text-white w-full p-3 rounded-lg"
                  loaderColor="#ffffff"
                  type="submit"
                  isLoading={loading}
                  disabled={loading || isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
