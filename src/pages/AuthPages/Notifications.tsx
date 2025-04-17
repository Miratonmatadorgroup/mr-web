import AuthPageLayout from '@/components/authComponents/AuthPageLayout'
import React from 'react'
import { LuWallet } from "react-icons/lu";
import { TbBulb } from "react-icons/tb";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import NavigationHeader from '@/components/shared/NavigationHeader';




const Notifications = () => {

  const noticeArray = [
    {
      icon: <LuWallet className='' />,
      title: 'wallet funded',
      unread: true,
      desc: 'Your wallet has been funded with ₦10,000.00',
      bg_color: 'bg-[#e0f8e5]',
      color: 'text-[#62c17b]',
      date: 'today, 10:43 AM'
    },
    {
      icon: <TbBulb className='' />,
      title: 'token generated',
      unread: true,
      desc: 'Your electricity token has been generated successfully',
      bg_color: 'bg-[#f1f5f9]',
      color: 'text-[#4d87dd]',
      date: 'yesterday, 2:15 PM'
    },
    {
      icon: <PiWarningCircle className='' />,
      title: 'low balance',
      desc: 'Your wallet balance is running low. Consider funding your wallet.',
      bg_color: 'bg-[#fff7ed]',
      color: 'text-[#fa8331]',
      date: 'Mar 18, 2024'
    },
    {
      icon: <PiWarningCircle className='' />,
      title: 'price update',
      desc: 'Electricity unit price has been updated to ₦117.5/kWh',
      bg_color: 'bg-[#f8fafc]',
      color: 'text-[#3e41d9]',
      date: 'Mar 15, 2024'
    },
    {
      icon: <IoIosCheckmarkCircleOutline className='' />,
      title: 'profile updated',
      desc: 'Your profile information has been updated successfully',
      bg_color: 'bg-[#e0f8e5]',
      color: 'text-[#62c17b]',
      date: 'Mar 10, 2024'
    },
  ]
  return (
    <AuthPageLayout>
      <div className='w-full'>
        <div className="flex w-full flex-col gap-10 text-[var(--dark)]">
          <div className="w-full flex flex-col gap-5 md:flex-row md:gap-0 md:items-start justify-between">
            <div className="flex items-start flex-col gap-1">
              <div className="text-[25px] font-bold">Notifications</div>
              <div className="text-sm md:text-base">Stay updated with your account activities</div>
            </div>
            <div className='w-fit flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md border border-[var(--primary)] text-[var(--primary)]'>
              <TbBulb /> <span>Mark all as read</span>
            </div>
            <div className="w-full md:hidden md:w-fit px-3 py-2.5 rounded-md bg-[#e0f8e5]">2 unread</div>

          </div>
          <div className="w-fit -mt-5 hidden md:block px-3 py-2.5 rounded-md bg-[#e0f8e5]">2 unread</div>


          <div className="w-full rounded-md md:border md:border-[var(--gray)]  md:px-3 py-2">
            <div className="w-full flex items-start flex-col gap-5">
              {noticeArray.map((item, i) => {
                return (
                  <div key={i} className={`w-full py-5 px-3 flex gap-2  flex-col items-start justify-between border rounded-md border-[var(--gray)] ${item.unread ? 'bg-[#fafafb]' : 'bg-white'}`}>
                    <div className="flex md:items-center  gap-3">
                      <div className="flex items-start  gap-5">
                        <div className={`flex items-center justify-center md:w-9 md:h-9 h-fit p-2  rounded-full ${item.bg_color}`}>
                          <div className={`${item.color}`}>{item.icon}</div>
                        </div>
                        <div className="text-[18px] font-bold capitalize">{item.title}</div>

                      </div>
                    </div>
                    <div className="flex md:items-center md:pl-14 w-full md:justify-between flex-col md:flex-row gap-2">
                      <div className="text-sm ">{item.desc}</div>
                      <hr className={`h-[1px] md:hidden  border-0 bg-[#e2e7ee]`} />
                      <div className="capitalize  text-sm">{item.date}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  )
}

export default Notifications