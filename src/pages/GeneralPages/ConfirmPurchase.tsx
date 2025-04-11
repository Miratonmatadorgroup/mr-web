import AuthPageLayout from "@/components/authComponents/AuthPageLayout";
import GeneralPageLayout from "@/components/generalComponents/GeneralPageLayout";
import Button from "@/components/shared/Button";
import ClipboardCopy from "@/components/shared/ClipboardCopy";
import InputDisplay from "@/components/shared/InputDisplay";
import Notice from "@/components/shared/Notice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmPurchase = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top of the page on mount
    scrollTo(0, 0);
  }, []);
  return (
    <GeneralPageLayout>
      <section className="w-full flex flex-col items-center justify-center py-6 gap-3 mt-10">
        {/* Header  */}
        <section className="text-gray-950 text-center py-4">
          <h1 className="font-bold text-4xl">Quick Token Purchase</h1>
          <p className="font-medium opacity-50 text-sm">
            Need Utility tokens fast? Purchase instantly now.
          </p>
        </section>
        <section className="w-4/5 md:w-3/5 mx-auto flex items-center justify-center flex-col border border-gray-200 rounded-xl p-4">
          <section className="text-gray-950 text-center py-4">
            <h1 className="font-bold text-2xl">Bank Transfer</h1>
            {/* Notice  */}
            <p className="font-medium opacity-50 text-sm">
              Kindly make a transfer of the amount specified to the account
              below. <br />
              Once you have made the transfer, click on the confirm payment
              button to confirm your payment.
            </p>
          </section>
          <div className="w-full flex items-start justify-center gap-5 flex-col text-start">
            <p>Account Details</p>

            <div className="border border-gray-200 rounded-lg p-4 w-full flex flex-col gap-1 relative">
              <ClipboardCopy
                text="10482840284"
                className="absolute right-5 top-5"
              />
              <InputDisplay label="Account Number" value="01234898249" />
              <InputDisplay label="Account Name" value="Raheem John" />
              <InputDisplay label="Bank Name" value="Providus Mfb" />
              <InputDisplay label="Amount" value="#1,000" />
            </div>
            <Notice
              messages={[
                "This account is unique to you. Do not share your account details",
                "Minimum transfer amount is #1,000.",
              ]}
            />
            <Button
              name="Confirm Payment"
              className="bg-[var(--primary)] text-white w-full p-3 rounded-lg self-center"
              loaderColor="#ffffff"
              type="button"
              isLoading={false}
              disabled={false}
              onClick={() => {
                navigate("/purchase/confirmation/1234");
              }}
            />
          </div>
        </section>
      </section>
    </GeneralPageLayout>
  );
};

export default ConfirmPurchase;
