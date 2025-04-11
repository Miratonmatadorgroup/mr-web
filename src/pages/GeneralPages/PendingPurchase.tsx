import GeneralPageLayout from "@/components/generalComponents/GeneralPageLayout";
import Button from "@/components/shared/Button";
import InputDisplay from "@/components/shared/InputDisplay";
import Notice from "@/components/shared/Notice";
import Timer from "@/components/shared/Timer";
import extractQueryParams from "@/utils/extractQueryParam";
import ErrorLogger from "@/utils/logger/errorLogger";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
const purchaseClientId = import.meta.env.VITE_QUICK_PURCHASE_CLIENT_ID;
interface SearchParams {
  meter_number: string;
  amount: string;
}

interface NavState {
  callback_url: string;
}
const PendingPurchase = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const [stop, setStop] = useState(false);
  const location = useLocation();
  const { callback_url } = location.state as NavState;
  const { amount, meter_number } = Object.fromEntries(
    searchParams.entries()
  ) as unknown as SearchParams;

  const duration = 1800; // 30 minutes in seconds
  const dateTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })
  ).toLocaleString("en-GB");

  const { ref } = extractQueryParams(callback_url);

  useEffect(() => {
    // Scroll to top of the page on mount
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(callback_url, {
          params: {
            clientId: purchaseClientId,
          }
        });
        const result = response.data;

        if (result.status === "success") {
          setSuccess(true);
          setStop(true);
          clearInterval(interval);
        }
      } catch (error) {
        ErrorLogger(`Error checking payment status: ${error}`);
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [ref]);

  return (
    <GeneralPageLayout>
      <section className="w-full flex flex-col items-center justify-center py-6 gap-3 mt-10">
        <section className="w-4/5 md:w-3/5 mx-auto flex items-center justify-center flex-col border border-gray-200 rounded-xl p-4">
          {success ? (
            <SuccessHeader />
          ) : (
            <PendingHeader
              stop={stop}
              duration={duration}
              onStopped={() => setSuccess(true)}
            />
          )}
          <div className="w-full flex items-start justify-center gap-5 flex-col text-start">
            <div className="border border-gray-200 rounded-lg p-4 w-full flex flex-col gap-1 relative">
              {/* {success ? (
                <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
                  <label className="block mb-1">Token</label>
                  <p className="text-gray-950 text-2xl font-bold mb-1 flex items-center gap-2">
                    1234-5678-9101-2345-6789-0123
                    <ClipboardCopy
                      text="1234-5678-9101-2345-6789-0123"
                      className="text-gray-500 text-lg cursor-pointer hover:text-gray-700 transition-all duration-200 ease-in-out"
                    />
                  </p>
                </div>
              ) : (
              )} */}
              <InputDisplay label="Reference" value={ref} />
              <InputDisplay label="Amount" value={`#${Number(amount) / 100}`} />
              <InputDisplay label="Meter Number" value={meter_number} />
              <InputDisplay label="Date & Time" value={dateTime} />
            </div>
            {success ? (
              <>
                <Button
                  name="Download Receipt"
                  className="bg-[var(--primary)] text-white w-full p-3 rounded-lg self-center"
                  loaderColor="#ffffff"
                  type="button"
                  isLoading={false}
                  disabled={true}
                  onClick={() => {}}
                />
              </>
            ) : (
              <>
                <Notice
                  messages={[
                    "Please wait till the coundown is over before you try again.",
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
        <h1 className="font-bold text-2xl">Payment Successful</h1>
        <p className="font-medium opacity-50 text-sm">
          Your token will be sent to your phone number shortly.
        </p>
      </div>
    </section>
  );
};

interface PendingHeaderProps {
  stop: boolean;
  onStopped?: () => void;
  duration: number;
}
const PendingHeader = ({ stop, duration, onStopped }: PendingHeaderProps) => {
  return (
    <section className="w-full text-gray-950 text-center flex justify-between py-4 px-3">
      {stop ? (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-500">
          <MdOutlineCancel size={30} />
        </div>
      ) : (
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <PulseLoader color="#FB923C" size={10} />
        </div>
      )}
      <div>
        <h1 className="font-bold text-2xl">Payment Processing</h1>
        <p className="font-medium opacity-50 text-sm">
          Please hold on while we confirm your payment.
        </p>
      </div>
      <Timer stop={stop} duration={duration} onStopped={onStopped} />
    </section>
  );
};
