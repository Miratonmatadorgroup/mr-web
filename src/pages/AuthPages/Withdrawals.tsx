import AuthPageLayout from '@/components/authComponents/AuthPageLayout'
import NavigationHeader from '@/components/shared/NavigationHeader'
import Notice from '@/components/shared/Notice'
import CustomSelect from '@/utils/CustomSelect'
import FormButton from '@/utils/FormButton'
import FormInput from '@/utils/FormInput'
import { ErrorMessage, naira } from '@/utils/pageUtils'
import React, { useEffect, useState } from 'react'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom'


interface Forms {
    amount: string,
    account_number: string,
    bank_name: string,
    account_name: string
}

interface AddNewAccountProps {
    account_number: string,
    bank_name: string,
    account_name: string
}
const localName = `Withdraw-Screen`
const localForm = `Forms`
const Withdrawals = () => {

    const [error, setError] = useState({
        status: false,
        message: ''
    })

    const [forms, setForms] = useState<Forms>(() => {
        const savedForms = localStorage.getItem(localForm);
        return savedForms
            ? JSON.parse(savedForms)
            : {
                amount: '',
                account_number: '',
                bank_name: '',
                account_name: '',
            };
    });


    const balance = 40000
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

    const [selectedAmt, setSelectedAmt] = useState<string | null>(null)

    const amountToFill = ['₦1,000', '₦2,000', '₦5,000', '₦10,000', '₦20,000', '₦50,000']

    const selectAmount = (amt: string) => {
        if (forms.amount) {
            setForms({ ...forms, amount: "" })
        }
        setForms((prev) => ({ ...prev, amount: amt.replace('₦', '') }));
        setSelectedAmt(amt)
    }

    const [screen, setScreen] = useState<number>(() => {
        const savedScreen = localStorage.getItem(localName);
        return savedScreen ? parseInt(savedScreen, 10) : 1;
    });

    const verifyAmount = () => {
        // Remove commas and non-numeric characters from the amount
        const formatamt = forms.amount.replace(/[^0-9.]/g, '');
        const newamt = parseFloat(formatamt);
        // Check if the amount is valid
        if (!newamt) {
            setError({ status: true, message: 'Please enter a valid amount' });
            setTimeout(() => {
                setError({ status: false, message: '' });
            }, 3000);
            return;
        }
        // Check if the amount is less than the minimum withdrawal amount
        if (newamt < 5000) {
            setError({ status: true, message: 'Minimum withdrawal amount is ₦5,000' });
            setTimeout(() => {
                setError({ status: false, message: '' });
            }, 3000);
            return;
        }
        // Check if the amount exceeds the wallet balance
        if (newamt > balance) return ErrorMessage(`Insufficient Funds`)

        // If all checks pass, proceed to the next screen
        setScreen(2);
    };

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


    useEffect(() => {
        localStorage.setItem(localName, screen.toString());
    }, [screen]);
    useEffect(() => {
        localStorage.setItem(localForm, JSON.stringify(forms));
    }, [forms]);

    //screen 2 states and functions

    const savedBanks = [
        {
            bank: `Zenith Bank`,
            account_number: `0123456789`,
            name: 'Raheem John'
        },
        {
            bank: `Shanono Bank`,
            account_number: `0123456789`,
            name: 'Raheem John'
        },
    ]

    const bankNames = ['Access', 'First Bank', 'GTB Bank']
    //map banks to list and display each field
    const bankOptions = savedBanks.map(bank => `${bank.bank} - ${bank.account_number} - ${bank.name}`);


    const [newAccount, setNewAccount] = useState({
        account_number: '',
        bank_name: '',
        account_name: ''
    } as AddNewAccountProps)



    const handleNewAccChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'account_number') {
            if (value.length > 10) return;
            const numericValue = value.replace(/[^0-9.]/g, '');
            setNewAccount((prev) => ({
                ...prev,
                [name]: numericValue,
            }));
            return;
        }
        setNewAccount((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const verifyWithdrawal = () => {
        if (!forms.amount ||
            !forms.account_name ||
            !forms.account_number ||
            !forms.bank_name) return ErrorMessage('Please fill all required fields')
        setScreen(3)
    }

    const [amountReceived, setAmountReceived] = useState<number | string>('')

    useEffect(() => {
        if (forms.amount) {
            const formatamt = forms.amount.replace(/[^0-9.]/g, '');
            const newamt = parseFloat(formatamt);
            const amountReceived = newamt - 100
            setAmountReceived(amountReceived)
        }
    }, [forms.amount])

    const [selectedOption, setSelectedOption] = useState<"" | "saved" | "new">("");


    //screen 3


    //screen 4 
    const navigate = useNavigate()
    const returnToDashboard = () => {
        localStorage.setItem(localForm, JSON.stringify({}));
        localStorage.setItem(localName, '1');
        // Reset forms state
        setForms({
            amount: '',
            account_name: '',
            account_number: '',
            bank_name: '',
        });
        navigate(`/user/dashboard`)
    };

    return (
        <AuthPageLayout>
            {screen === 1 &&
                <div className='w-full'>
                    <NavigationHeader title='Withdraw Funds' text='Transfer money from your wallet to your bank account' url='/user/dashboard' />
                    <div className="mt-10 border rounded-md border-[var(--gray)] w-full p-2">
                        <div className="w-full flex items-start flex-col gap-3">
                            <div className="flex items-start flex-col gap-1">
                                <div className="text-[25px] font-bold">Withdraw to Bank Account</div>
                                <div className="text-sm md:text-base">Enter the amount you want to withdraw</div>
                            </div>

                            <div className="bg-[#f2fbf4] w-full p-3 rounded-md flex items-center justify-between">
                                <div className=" font-bold">Wallet Balance</div>
                                <div className="font-bold">{naira}{balance.toLocaleString()}</div>
                            </div>
                            <div className="w-full">
                                <FormInput
                                    backbg={false}
                                    onChange={handleChange}
                                    name='amount' value={forms.amount} label='Amount (₦)' placeholder='enter amount'
                                    errorText={error.status ? error.message : ''}
                                />
                            </div>
                            <div className="w-full flex items-start flex-col gap-2">
                                <div className="text-base">Quick select</div>
                                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 ">
                                    {amountToFill.map((amt, i) => (
                                        <div onClick={() => selectAmount(amt)} key={i} className={` ${selectedAmt === amt && 'bg-[var(--primary)] text-white'} flex border border-[var(--gray)] p-2 rounded-md cursor-pointer items-center w-full justify-center`}>{amt}</div>
                                    ))}
                                </div>
                            </div>
                            <Notice messages={['Withdrawals are processed within 24 hours', 'A fee of ₦100 applies to all withdrawals', 'Minimum withdrawal amount is ₦5,000']} />

                            <FormButton onClick={verifyAmount} type='button' title='Next' className='!w-fit px-6 !py-1.5 ' />
                        </div>
                    </div>
                </div>}

            {screen === 2 &&
                < div className="w-full">
                    <NavigationHeader title='Withdraw Funds' text='Transfer money from your wallet to your bank account' url={() => setScreen(1)} />

                    <div
                        onClick={() => setSelectedOption('saved')}
                        className="border-[var(--gray)] cursor-pointer w-full border rounded-md  mt-10 p-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div onClick={() => setSelectedOption('saved')} className={`${selectedOption === 'saved' ? 'bg-[var(--primary)]' : 'bg-[var(--gray)]'} cursor-pointer w-3 h-3 rounded-full`}></div>
                            <div className="font-bold">Use saved account</div>
                        </div>
                        {selectedOption === 'saved' && <CustomSelect
                            options={bankOptions}
                            labeltext='select a saved bank'
                            border={true}
                            bg={false}
                            onSelect={(selectedLabel) => {
                                const selectedBank = savedBanks.find(bank =>
                                    `${bank.bank} - ${bank.account_number} - ${bank.name}` === selectedLabel
                                );
                                if (selectedBank) {
                                    setForms(prev => ({
                                        ...prev,
                                        bank_name: selectedBank.bank,
                                        account_number: selectedBank.account_number,
                                        account_name: selectedBank.name
                                    }));
                                }
                            }}
                        />}

                    </div>
                    <div
                        onClick={() => setSelectedOption('new')}
                        className="border-[var(--gray)] cursor-pointer w-full border rounded-md  mt-10 p-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div
                                className={`${selectedOption === 'new' ? 'bg-[var(--primary)]' : 'bg-[var(--gray)]'} cursor-pointer w-3 h-3 rounded-full`}></div>
                            <div className="font-bold">Add new account</div>
                        </div>
                        {selectedOption === 'new' && <div className="flex flex-col gap-4 items-start">
                            <CustomSelect
                                options={bankNames}
                                labeltext='select a bank'
                                border={true}
                                bg={false}
                                onSelect={(bank) => { setNewAccount({ ...newAccount, bank_name: bank }) }}
                            />

                            <div className="w-full">
                                <FormInput
                                    label='Account Number'
                                    placeholder='Enter 10-digit account number'
                                    name='account_number'
                                    backbg={false}
                                    onChange={handleNewAccChange}
                                    value={newAccount.account_number}
                                />
                            </div>
                            <div className="w-full">
                                <FormInput
                                    label='Account Name'
                                    backbg={false}
                                    onChange={handleNewAccChange}
                                    placeholder='Enter account name'
                                    name='account_name'
                                    value={newAccount.account_name}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-[var(--gray)] cursor-pointer w-3 h-3 rounded-full"></div>
                                <div className="">Save this account for future withdrawals</div>
                            </div>
                            <FormButton onClick={verifyWithdrawal} type='button' title='Next' className='!w-fit px-6 !py-1.5 ' />
                        </div>}
                    </div>
                    {selectedOption !== 'new' &&
                        <div className="mt-10 ">
                            <FormButton onClick={verifyWithdrawal} type='button' title='Next' className='!w-fit px-6 !py-1.5 ' />
                        </div>
                    }
                </div>
            }

            {screen === 3 &&
                < div className="w-full">
                    <NavigationHeader title='Withdraw Funds' text='Transfer money from your wallet to your bank account' url={() => setScreen(2)} />

                    <div className="mt-10 w-full rounded-md border border-[var(--gray)] p-3">
                        <div className="text-[20px] font-bold mb-3">Withdrawal Summary</div>

                        <div className="flex flex-col gap-5 items-start">

                            <div className="flex flex-col items-start gap-5 w-full rounded-md border border-[var(--gray)] px-3 py-5 ">
                                <div className="flex w-full flex-col gap-5">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#a7b1be]">Amount</div>
                                        <div className="font-bold">{naira}{forms.amount}</div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#a7b1be]">Withdrawal Fee</div>
                                        <div className="font-bold">{naira}100</div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#a7b1be]">Total Received</div>
                                        <div className="font-bold">{naira}{amountReceived.toLocaleString()} </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-col items-start gap-5 w-full rounded-md border border-[var(--gray)] px-3 py-5 ">
                                <div className="flex w-full flex-col gap-5">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#a7b1be]">Bank Name</div>
                                        <div className="font-bold">{forms.bank_name}</div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#a7b1be]">Account Number</div>
                                        <div className="font-bold">{forms.account_number}</div>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-[#a7b1be]">Account Name</div>
                                        <div className="font-bold">{forms.account_name} </div>
                                    </div>
                                </div>
                            </div>
                            <Notice messages={['Please confirm that all details are correct before proceeding. Withdrawals to incorrect bank accounts cannot be reversed.']} />

                            <FormButton onClick={() => setScreen(4)} type='button' title='Confirm Withdrawal' className='!w-fit px-6 !py-1.5 ' />
                        </div>
                    </div>
                </div>
            }

            {screen === 4 &&
                <div className="w-full rounded-md border border-[var(--gray)] p-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#e0f8e5] flex rounded-full items-center justify-center p-2.5">
                            <IoIosCheckmarkCircleOutline className='text-[var(--green)]' />
                        </div>
                        <div className="items-start flex-col gap-2">
                            <div className="font-bold text-[25px]">Withdrawal Initiated</div>
                            <div className="text-sm">Your withdrawal request has been successfully initiated and is being processed.</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-5 mt-5">
                        <div className="flex flex-col items-start gap-5 w-full rounded-md border border-[var(--gray)] px-3 py-5 ">
                            <div className="flex w-full flex-col gap-5">
                                <div className="flex items-center justify-between w-full">
                                    <div className="">Transaction ID</div>
                                    <div className="font-bold">WD338199</div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="">Amount</div>
                                    <div className="font-bold">{naira}{amountReceived.toLocaleString()}</div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="">Status</div>
                                    <div className="font-bold">Processing </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="">Estimated Completion</div>
                                    <div className="font-bold">Within 24hrs</div>
                                </div>
                            </div>
                        </div>
                        <Notice messages={['Your withdrawal is being processed and will be credited to your bank account within 24 hours.', 'You will receive an email and SMS notification once the withdrawal is completed.']} />

                        <FormButton onClick={returnToDashboard} type='button' title='Return to Dashboard' className='!w-fit px-6 !py-1.5 ' />
                    </div>
                </div>
            }
        </AuthPageLayout >
    )
}

export default Withdrawals