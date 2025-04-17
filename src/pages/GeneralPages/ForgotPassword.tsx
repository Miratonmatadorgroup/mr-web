import { useState } from "react";
import { SendTokenModal } from "@/components/generalComponents/forgetPassword/SendTokenModal";
import { ConfirmOtpModal } from "@/components/generalComponents/forgetPassword/ConfirmOtpModal";
import { ChangePasswordModal } from "@/components/generalComponents/forgetPassword/ChangePasswordModal";

const ForgotPassword = () => {
  const [screen, setScreen] = useState(1);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  return (
    <div className="w-full lg:overflow-hidden h-screen ">
      <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
        <div className="hidden lg:block h-full relative pb-2 ">
          <img
            src={"/assets/images/miraton-logo.png"}
            className="absolute w-[6rem]  top-10 left-20 z-20 "
            alt=""
          />
          <div className="flex items-start text-white  flex-col absolute bottom-10 z-10 left-10">
            <div className="font-bold text-[40px]">Retrieve account</div>
            <div className="text-[16px] font-light">
              Sign in to access the features of Miraton Rose
            </div>
          </div>
          <img
            src={"/assets/images/signin_frame.png"}
            alt="image frame"
            className={`h-[100dvh] z-0 rounded-md w-full object-cover`}
          />
        </div>
        <div className="">
          {screen === 1 && (
            <SendTokenModal setScreen={setScreen} setEmail={setEmail} />
          )}

          {screen === 2 && (
            <ConfirmOtpModal setScreen={setScreen} setOtp={setOtp} />
          )}

          {screen === 3 && <ChangePasswordModal email={email} otp={otp} setScreen={setScreen} />}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
