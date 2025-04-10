import AuthPageLayout from "@/components/authComponents/AuthPageLayout";
import Button from "@/components/shared/Button";
import InputDisplay from "@/components/shared/InputDisplay";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const PendingPurchase = () => {
  const navigate = useNavigate();
  return (
    <AuthPageLayout>
      <section className="w-full flex flex-col items-center justify-center py-6 gap-3">
        <section className="w-4/5 md:w-3/5 mx-auto flex items-center justify-center flex-col border border-gray-200 rounded-xl p-4">
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
            <div className="flex items-center px-2">
              <p className="text-xl font-semibold">1:32</p>
            </div>
          </section>
            <div className="w-full flex items-start justify-center gap-5 flex-col text-start">
            <div className="border border-gray-200 rounded-lg p-4 w-full flex flex-col gap-1 relative">
              <InputDisplay label="Session ID" value="1234898249" />
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
            <Notice />
            <Button
              name="Back"
              className="bg-[var(--primary)] text-white w-full p-3 rounded-lg self-center"
              loaderColor="#ffffff"
              type="button"
              isLoading={false}
              disabled={false}
              onClick={() => navigate(-1)}
            />
            </div>
        </section>
      </section>
    </AuthPageLayout>
  );
};

export default PendingPurchase;

const Notice = () => {
  return (
    <section className="w-full flex items-start justify-center gap-1 flex-col ">
      <ul className="w-full list-disc list-inside text-sm font-normal text-gray-700 border border-gray-200 rounded-lg p-3 bg-neutral-100">
        <li>
          Please wait till the coundown is over before you try again or lodge a
          complaint.
        </li>
      </ul>
    </section>
  );
};
