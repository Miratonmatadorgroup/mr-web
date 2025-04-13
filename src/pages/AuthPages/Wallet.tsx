import AuthPageLayout from '@/components/authComponents/AuthPageLayout'
import Notice from '@/components/shared/Notice';
import FormButton from '@/utils/FormButton';
import FormInput from '@/utils/FormInput'
import React, { useEffect, useState } from 'react'
import { IoRadioButtonOffSharp, IoRadioButtonOn } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import masterCardImage from '@/assets/authImages/mastercard.png'
import { ErrorMessage, SuccessMessage } from '@/utils/pageUtils';

interface selectedProps {
  title: string;
  type: string;
  description: string;
}

const localName = 'header'
const Wallet = () => {
  const headers = [
    {
      title: 'Card Payment',
      type: 'card',
      description: 'Fund your wallet instantly using your debit or credit card'
    },
    {
      title: 'Bank Transfer',
      type: 'bank',
      description: 'Fund your wallet by transferring to your dedicated virtual account'
    },
    {
      title: 'Saved Cards',
      type: 'save',
      description: 'Fund your wallet instantly using your debit or credit card'
    }
  ]
  const [selected, setSelected] = useState<selectedProps>(
    localStorage.getItem(localName) ? JSON.parse(localStorage.getItem(localName) || '') : headers[0]
  )

  const changeHeader = (header: selectedProps) => {
    setSelected(header)
    localStorage.setItem(localName, JSON.stringify(header))
  }

  //amount state
  // This state holds the amount to be filled in the form. It is initialized to an empty string.
  const [forms, setForms] = useState({
    amount: ''
  })

  //error state to check for errors in form fields
  const [error, setError] = useState({
    status: false,
    message: ''
  })
  const [loading, setLoading] = useState(false)

  //save card details
  const [saveCard, setSaveCard] = useState(false)
  const SaveIcon: React.ReactNode = saveCard ?
    <IoRadioButtonOn
      onClick={() => setSaveCard(false)}
      size={20} className='text-[var(--primary)] cursor-pointer' /> :
    <IoRadioButtonOffSharp
      onClick={() => setSaveCard(true)}
      size={20} className='text-[var(--gray)] cursor-pointer' />



  // Handle form input changes
  // This function handles changes to the form inputs, specifically for the amount field.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      const numericValue = value.replace(/[^0-9.]/g, '');
      const formattedValue = numericValue ? Number(numericValue).toLocaleString('en-US') : '';
      setForms((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
      return;
    }
    setForms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //quick select amounts
  const amountToFill = ['₦1,000', '₦2,000', '₦5,000', '₦10,000', '₦20,000', '₦50,000']
  const [selectedAmt, setSelectedAmt] = useState<string | null>(null)
  const selectAmount = (amt: string) => {
    setSelectedAmt(amt)
    const numericValue = amt.replace(/[^0-9]/g, '');
    const formattedValue = numericValue ? Number(numericValue).toLocaleString('en-US') : '';
    setForms((prev) => ({
      ...prev,
      amount: formattedValue,
    }));
  }

  //new cards state
  const [cards, setCards] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  //saved cards state
  const [savedcards, setSavedCards] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  //bank details for transfer
  const [bankDetails, setBankDetails] = useState({
    account_name: 'Raheem John',
    account_number: '0123456789',
    bank_name: 'Providus Mfb'
  })

  useEffect(() => {
    // Check if the entered amount matches any value in the `amountToFill` array
    const matchingAmount = amountToFill.find(
      (amt) => amt.replace(/₦|,/g, '') === forms.amount.replace(/,/g, '')
    );
    if (matchingAmount) {
      setSelectedAmt(matchingAmount);
    } else {
      setSelectedAmt(null);
    }
  }, [forms.amount, amountToFill]);


  // Card number validation
  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1-');
    if (formattedValue.length > 19) return;
    setCards((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }));
  }

  // Expiry date validation
  const handleExpiryDate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    // Add a `/` after the first two digits only
    const formattedValue = numericValue.length > 2
      ? `${numericValue.slice(0, 2)}/${numericValue.slice(2, 6)}`
      : numericValue;
    if (formattedValue.length > 7) return;
    setCards((prev) => ({
      ...prev,
      expiryDate: formattedValue,
    }));
  };

  //handle cvv validation
  const handleCvv = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length > 3) return;
    setCards((prev) => ({
      ...prev,
      cvv: numericValue,
    }));
  }


  //toggle save cards
  const [toggleCard, setToggleCard] = useState(false)
  const handleToggleCard = () => {
    setToggleCard((prev) => !prev)
  }

  //copy to clipboard fn
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankDetails.account_number).then(() => {
      SuccessMessage(`Account number copied successfully`)
    }
    ).catch((err) => {
      console.error('Error copying text: ', err);
      ErrorMessage(`Error copying account number: ${err}`)
    })
  }
  return (
    <AuthPageLayout>
      <div className="w-full">
        <div className="w-full flex items-start flex-col gap-1 mb-5">
          <div className="font-bold text-[25px]">Fund Wallet</div>
          <div className=" text-sm md:text-base">Fund your wallet to start using our services</div>
        </div>

        <div className="w-full grid grid-cols-3 bg-[var(--light-green)] p-1 gap-2 rounded-md">
          {headers.map((header, index) => (
            <button key={index}
              onClick={() => changeHeader(header)}
              className={`w-full cursor-pointer rounded-md ${selected.type === header.type ? 'bg-white' : 'bg-transparent'} text-center text-sm  py-3`}>
              {header.title}
            </button>
          ))}
        </div>


        <div className="w-full mt-5 border rounded-md p-3 border-[var(--gray)] ">
          <div className="flex items-start flex-col gap-5">
            <div className="w-full flex items-start flex-col gap-1 ">
              <div className="font-bold text-[20px]">{selected?.title}</div>
              <div className=" text-sm md:text-base">{selected?.description}</div>
            </div>

            <div className="w-full">
              <FormInput
                backbg={false}
                onChange={handleChange}
                bold={false}
                name='amount' value={forms.amount}
                label={selected.type === 'bank' ? 'Amount to transfer(₦)' : ' Amount(₦)'} placeholder='enter amount'
                errorText={error.status ? error.message : ''}
              />
            </div>

            {(selected.type === headers[0].type || selected.type === headers[2].type) && <div className="w-full flex items-start flex-col gap-2">
              <div className="text-base">Quick select</div>
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 ">
                {amountToFill.map((amt, i) => (
                  <div onClick={() => selectAmount(amt)} key={i} className={` ${selectedAmt === amt && 'bg-[var(--primary)] text-white'} flex border border-[var(--gray)] p-2 rounded-md cursor-pointer items-center w-full justify-center`}>{amt}</div>
                ))}
              </div>
            </div>}


            {/* Dynamic fiields based on selected option */}
            {/* header[0] default selected */}
            {selected.type === headers[0].type && (<>
              <div className="text-base">Card Details</div>
              <div className="w-full  border rounded-md p-3 border-[var(--gray)] ">

                <FormInput
                  placeholder='1234-5678-9012-3456'
                  value={cards.cardNumber}
                  label='Card Expiry'
                  backbg={false}
                  bold={false}
                  onChange={handleCardNumber}
                  errorText={error.status ? error.message : ''}
                />


                <div className="grid w-full grid-cols-2 gap-5 mt-5">
                  <FormInput
                    placeholder='MM/YYYY'
                    value={cards.expiryDate}
                    name='expiryDate'
                    label='Card Expiry'
                    bold={false}
                    backbg={false}
                    onChange={handleExpiryDate}
                    errorText={error.status ? error.message : ''}
                  />

                  <FormInput
                    placeholder='123'
                    name='cvv'
                    value={cards.cvv}
                    label='CVV'
                    backbg={false}
                    bold={false}
                    onChange={handleCvv}
                    errorText={error.status ? error.message : ''}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {SaveIcon}
                <div className="">Save this card</div>
              </div>
            </>)}

            {/* header[1] */}
            {selected.type === headers[1].type && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5  w-full">

                <div className="flex items-start flex-col gap-2 w-full">
                  <div className="">Account Details</div>
                  <div className="border border-[var(--gray)] rounded-md p-3 h-[14rem]  flex items-start justify-between w-full">
                    <div className="flex items-start w-full flex-col gap-2">
                      <div className="flex items-start flex-col gap-2">
                        <div className="">
                          <div className="text-base">Account Name</div>
                          <div className=" font-bold">{bankDetails.account_name}</div>
                        </div>
                        <div className="">
                          <div className="text-base">Account Number</div>
                          <div className=" font-bold">{bankDetails.account_number}</div>
                        </div>
                        <div className="">
                          <div className="text-base">Bank Name</div>
                          <div className=" font-bold">{bankDetails.bank_name}</div>
                        </div>
                      </div>
                    </div>
                    <div onClick={copyToClipboard} className="p-3 cursor-pointer rounded-full bg-[#e0f8e5]">
                      <MdContentCopy size={20} className='text-[var(--primary)]' />
                    </div>

                  </div>
                </div>

                <div className="flex items-start flex-col gap-2 w-full">
                  <div className="">Notice</div>
                  <div className="border border-[var(--gray)] rounded-md p-3 h-[14rem] bg-[#f5f5f5] w-full">
                    <Notice border={false} messages={['Your wallet will be credited immediately after your transfer is confirmed.', 'This account is unique to you. Do not share your account details.', 'Minimum transfer amount is ₦1,000.']} />
                  </div>
                </div>


              </div>
            )}

            {/* header[2] */}
            {selected.type === headers[2].type && (
              <>
                <div className="flex flex-col gap-2 items-start w-full">
                  <div className="text-base">Saved Cards</div>
                  <div className="w-full border border-[var(--gray)] rounded-md p-3">
                    <div className="flex items-start flex-col gap-2">
                      <div className="text-base">Card Detail</div>

                      <div className={`flex ${toggleCard ? "items-start" : "items-center"} gap-3 w-full`}>
                        <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                        <div
                          onClick={handleToggleCard}
                          className={`w-11/12 cursor-pointer border border-[var(--gray)] rounded-md p-3 overflow-hidden transition-all duration-500 ease-in-out ${toggleCard ? 'h-auto' : 'h-14'
                            }`}
                        >
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 w-full">
                              <img src={masterCardImage} alt="mastercard" className="w-10" />
                              <div className="text-base">1234 **** **** 3456</div>
                            </div>
                            <div
                              className={`transition-opacity duration-500 ease-in-out ${toggleCard ? 'opacity-100' : 'opacity-0'
                                } items-start flex-col gap-2`}
                            >
                              <div className="flex items-center gap-5">
                                <div className="text-base">Card Number:</div>
                                <div className="font-bold">1234 **** **** 3456</div>
                              </div>
                              <div className="flex items-center gap-5">
                                <div className="text-base">Expiry Date</div>
                                <div className="font-bold">12/25</div>
                              </div>
                              <div className="flex items-center gap-5">
                                <div className="text-base">CVV</div>
                                <div className="font-bold">475</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <FormButton type='button' title='Pay Now' className='!w-fit px-6 !py-1.5 ' />

          </div>
        </div>
      </div>
    </AuthPageLayout>
  )
}

export default Wallet