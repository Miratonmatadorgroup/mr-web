import AuthPageLayout from '@/components/authComponents/AuthPageLayout'
import { dashbOardTransactions } from '@/components/authComponents/AuthUtils'
import React, { useEffect, useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { LuWallet } from "react-icons/lu";
import { IoCopyOutline } from "react-icons/io5";
import FormButton from '@/utils/FormButton'
import { ErrorMessage, SuccessMessage } from '@/utils/pageUtils'


interface DataProps {
    date: string;
    type: string;
    amount: string;
    method: string;
    status: string;
}

const OneTransactionHistory = () => {

    const { slug, id } = useParams<{ slug: string; id: string }>(); // Get slug and id from params

    const transactionId = Number(id);
    const [data, setData] = useState<DataProps>({
        date: '',
        type: '',
        amount: '',
        method: '',
        status: '',
    });

    // Find the transaction by id
    useEffect(() => {
        const transaction = dashbOardTransactions.find((_, i) => i + 1 === transactionId);
        if (transaction) {
            setData(transaction)
        }
    }, [])

    const card = data?.method.toLocaleLowerCase()
    const copyToClip = () => {
        navigator.clipboard.writeText(`1933-47382-4838-7473`)
            .then(() => { SuccessMessage(`Meter token copied successfully`) })
            .catch((err: any) => {
                ErrorMessage(`Error in copying meter token`)
                console.log(err.message)
            })
    }
    return (
        <AuthPageLayout>
            <div className='w-full'>
                <div className="flex items-start gap-3">
                    <Link to={`/user/history`}
                        className="flex items-center px-3 py-2 rounded-md cursor-pointer border border-[var(--gray)] justify-center"
                    >
                        <HiArrowLeft />
                    </Link>
                    <div className="flex items-start flex-col gap-5 ">
                        <div className="flex items-start flex-col gap-1">
                            <div className="text-[20px] md:text-[25px] font-bold">Transaction Details</div>
                            <div className="flex capitalize items-center gap-2">
                                <div className="text-sm md:text-base">{data?.type}</div>
                                <div className="w-1 h-1 rounded-full bg-[var(--primary)]"></div>
                                <div className="text-sm md:text-base">{data.date}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 w-full p-3 border border-[var(--gray)] rounded-md">
                    <div className="flex flex-col items-start gap-5">
                        <div className="flex items-start flex-col gap-1">
                            <div className="font-bold capitalize text-[20px]">{data?.type}</div>
                            <div className="font-light text-base">Transaction ID: {slug === 'electricity_token' ? 'tx1' : 'tx2'}</div>
                        </div>
                        <div
                            className={`px-3 py-2  rounded-md bg-[var(--gray)] ${data?.status === 'successful' ? 'text-[#15803d]' : data?.status === 'failed' ? 'text-red-600' : 'text-gray-600'} font-semibold`}>{data?.status}
                        </div>
                        <div className="rounded-md border border-[var(--gray)] bg-[var(--litegray)] p-3 w-full">
                            <div className="flex items-start flex-col md:flex-row md:justify-between  gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-fit p-3 rounded-full bg-[#e0f8e5]">
                                        <LuWallet className='text-[#62c17a] text-2xl' />
                                    </div>
                                    <div className="flex items-start text-base flex-col">
                                        <div className="">Amount Funded</div>
                                        <div className="font-bold">{data?.amount.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="flex items-start flex-col ">
                                    <div className="">Date & Time</div>
                                    <div className="text-lg font-bold">Mar 21, 2024 at 10:43 AM</div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md border border-[var(--gray)] bg-transparent p-3 w-full">
                            <div className="flex items-start flex-col  gap-4">
                                <div className="w-11/12 lg:w-3/4 flex flex-col gap-5">
                                    <div className="font-bold text-base">Transaction Information</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-1 flex-col">
                                            <div className="">Transaction Type</div>
                                            <div className="font-bold capitalize">{data?.type}</div>
                                        </div>
                                        <div className="flex items-start gap-1 flex-col">
                                            <div className="">Payment Method</div>
                                            <div className="font-bold capitalize">{data?.method}</div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='border-0 bg-[#e5eaf0] w-full h-[2px]' />
                                {slug !== 'electricity_token' && card === 'card payment' &&
                                    <>
                                        <div className="w-11/12 lg:w-3/4 flex flex-col gap-5">
                                            <div className="font-bold text-base">Funding Details</div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start gap-1 flex-col">
                                                    <div className="">Card Type</div>
                                                    <div className="font-bold capitalize">Visa</div>
                                                </div>
                                                <div className="flex items-start gap-1 flex-col">
                                                    <div className="">Card Number</div>
                                                    <div className="font-bold capitalize">**** **** **** 4242</div>
                                                </div>
                                                <div className="flex items-start gap-1 flex-col">
                                                    <div className="">Payment Reference</div>
                                                    <div className="font-bold capitalize">PAY-REF-123456</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                }

                                {slug === 'electricity_token' &&
                                    <>
                                        <div className="w-11/12  lg:w-3/4 flex flex-col gap-4">
                                            <div className="font-bold text-base">Token Details</div>

                                            <div className="flex items-start flex-col gap-1">
                                                <div className="">Token</div>
                                                <div className="flex items-center gap-5">
                                                    <div className="font-bold">1234-5678-4959-5958</div>
                                                    <IoCopyOutline onClick={copyToClip} className='text-lg cursor-pointer' />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start gap-1 flex-col">
                                                    <div className="">Units</div>
                                                    <div className="font-bold capitalize">42.5kWh</div>
                                                </div>
                                                <div className="flex items-start gap-1 flex-col">
                                                    <div className="">Meter Number</div>
                                                    <div className="font-bold capitalize">45678901234</div>
                                                </div>
                                                <div className="flex items-start gap-1 flex-col">
                                                    <div className="">Distribution Company</div>
                                                    <div className="font-bold capitalize">Eko Electric</div>
                                                </div>
                                                <div className="flex items-start gap-1 flex-col">
                                                    <div className="">Unit Price</div>
                                                    <div className="font-bold capitalize">₦117.65/kWh</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                }
                            </div>

                        </div>
                        <FormButton type='button' className='!w-fit px-4' title='Download receipt' />

                    </div>

                </div>
            </div>
        </AuthPageLayout>
    )
}

export default OneTransactionHistory