import GeneralPageLayout from "@/components/generalComponents/GeneralPageLayout";
import Button from "@/components/shared/Button";
import ClipboardCopy from "@/components/shared/ClipboardCopy";
import InputDisplay from "@/components/shared/InputDisplay";
import Notice from "@/components/shared/Notice";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SearchParams {
  account_number: string;
  account_name: string;
  bank_name: string;
  amount: string;
  meter_number: string;
  callback_url: string;
}
const ConfirmPurchase = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    account_number,
    account_name,
    bank_name,
    amount,
    meter_number,
    callback_url,
  } = Object.fromEntries(searchParams.entries()) as unknown as SearchParams;
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
            {account_number && account_name && bank_name && amount ? (
              <div className="border border-gray-200 rounded-lg p-4 w-full flex flex-col gap-1 relative">
                <ClipboardCopy
                  text={account_number}
                  className="bg-green-200 text-green-500 absolute right-5 top-5"
                />
                <InputDisplay label="Account Number" value={account_number} />
                <InputDisplay label="Account Name" value={account_name} />
                <InputDisplay label="Bank Name" value={bank_name} />
                <InputDisplay label="Amount" value={`#${Number(amount) / 100}`} />
              </div>
            ) : (
              <AccountDetailSuspense />
            )}

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
                navigate(
                  `/purchase/confirmation?amount=${amount}&meter_number=${meter_number}`, {
                    state: {callback_url}
                  }
                );
              }}
            />
          </div>
        </section>
      </section>
    </GeneralPageLayout>
  );
};

export default ConfirmPurchase;

const AccountDetailSuspense = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 w-full flex flex-col gap-1 relative">
      <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
        <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
          <label className="block mb-1">Account Number</label>
          <p className="text-gray-950 text-xl font-bold mb-1">
            <span className="animate-pulse bg-gray-300 rounded-md w-4/5 h-7 inline-block"></span>
          </p>
        </div>
        <label className="block mb-1">Account Name</label>
        <p className="text-gray-950 text-xl font-bold mb-1">
          <span className="animate-pulse bg-gray-300 rounded-md w-4/5 h-7 inline-block"></span>
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
        <label className="block mb-1">Bank Name</label>
        <p className="text-gray-950 text-xl font-bold mb-1">
          <span className="animate-pulse bg-gray-300 rounded-md w-4/5 h-7 inline-block"></span>
        </p>
      </div>
      <div className="w-full flex flex-col gap-1 text-sm font-medium text-gray-700">
        <label className="block mb-1">Amount</label>
        <p className="text-gray-950 text-xl font-bold mb-1">
          <span className="animate-pulse bg-gray-300 rounded-md w-3/5 h-7 inline-block"></span>
        </p>
      </div>
    </div>
  );
};
