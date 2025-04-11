import GeneralPageLayout from "@/components/generalComponents/GeneralPageLayout";
import Button from "@/components/shared/Button";
import InputDisplay from "@/components/shared/InputDisplay";
import Notice from "@/components/shared/Notice";
import Timer from "@/components/shared/Timer";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const PendingPurchase = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Scroll to top of the page on mount
    scrollTo(0, 0);
  }, []);

  return (
    <GeneralPageLayout>
      <section className="w-full flex flex-col items-center justify-center py-6 gap-3 mt-10">
        <section className="w-4/5 md:w-3/5 mx-auto flex items-center justify-center flex-col border border-gray-200 rounded-xl p-4">
          {success ? (
            <SuccessHeader />
          ) : (
            <PendingHeader duration={120} onStopped={() => setSuccess(true)} />
          )}
          <div className="w-full flex items-start justify-center gap-5 flex-col text-start">
            <div className="border border-gray-200 rounded-lg p-4 w-full flex flex-col gap-1 relative">
              {success ? (
                <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
                  <label className="block mb-1">Token</label>
                  <p className="text-gray-950 text-2xl font-bold mb-1 flex items-center gap-2">
                    1234-5678-9101-2345-6789-0123
                    <MdContentCopy
                      className="text-gray-500 text-lg cursor-pointer hover:text-gray-700 transition-all duration-200 ease-in-out"
                      onClick={() => console.log("clicked")}
                    />
                  </p>
                </div>
              ) : (
                <InputDisplay label="Session ID" value="1234898249" />
              )}
              <div className="flex justify-between">
                <InputDisplay label="Amount" value="#1,000.00" />
                <InputDisplay label="Units" value="8.51 kWh" />
              </div>
              <InputDisplay label="Meter Number" value="1234-5678-910" />
              <InputDisplay
                label="Date & Time"
                value="24/03/2025, 10:28:32 PM"
              />
            </div>
            {success ? (
              <>
                <Notice
                  messages={[
                    "This token has been sent to your email and phone number. Please keep it safe.",
                  ]}
                />
                <Button
                  name="Back"
                  className="bg-[var(--primary)] text-white w-full p-3 rounded-lg self-center"
                  loaderColor="#ffffff"
                  type="button"
                  isLoading={false}
                  disabled={false}
                  onClick={() => navigate(-1)}
                />
              </>
            ) : (
              <>
                <Notice
                  messages={[
                    "Please wait till the coundown is over before you try again or lodge a complaint.",
                  ]}
                />
                <Button
                  name="Download Receipt"
                  className="bg-[var(--primary)] text-white w-full p-3 rounded-lg self-center"
                  loaderColor="#ffffff"
                  type="button"
                  isLoading={false}
                  disabled={false}
                  onClick={() => console.log("clicked")}
                />
              </>
            )}
          </div>
        </section>
      </section>
    </GeneralPageLayout>
  );
};

export default PendingPurchase;

const SuccessHeader = () => {
  return (
    <section className="w-full text-gray-950 text-center flex gap-4 py-4 px-3">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-500">
        <FaRegCheckCircle size={30} />
      </div>
      <div className="text-left">
        <h1 className="font-bold text-2xl">Vending Successful</h1>
        <p className="font-medium opacity-50 text-sm">
          Your token has been successfully generated.
        </p>
      </div>
    </section>
  );
};

interface PendingHeaderProps {
  onStopped?: () => void;
  duration: number;
}
const PendingHeader = ({ duration, onStopped }: PendingHeaderProps) => {
  return (
    <section className="w-full text-gray-950 text-center flex justify-between py-4 px-3">
      <div className="w-16 h-16 flex items-center justify-center">
        <PulseLoader color="#FB923C" size={10} />
      </div>
      <div>
        <h1 className="font-bold text-2xl">Payment Processing</h1>
        <p className="font-medium opacity-50 text-sm">
          Please hold on while we confirm your payment.
        </p>
      </div>
      <Timer duration={duration} onStopped={onStopped} />
    </section>
  );
};
