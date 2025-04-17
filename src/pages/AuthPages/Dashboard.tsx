import React, { useState, useRef, useEffect } from 'react'
import AuthPageLayout from '../../components/authComponents/AuthPageLayout'
import { LuArrowUpFromLine } from "react-icons/lu";
import { LuWallet } from "react-icons/lu";
import { FaCoins } from "react-icons/fa6";
import { PiWarningCircle } from "react-icons/pi";
import { LuHistory } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { TbBulb } from 'react-icons/tb';
import { RiFilterOffFill } from "react-icons/ri";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { dashbOardTransactions } from '@/components/authComponents/AuthUtils';
import { Link } from 'react-router-dom';

export const dashboardUrls = [
  {
    name: "Fund Wallet",
    icon: <LuWallet className='' />,
    url: '/user/dashboard'
  },
  {
    name: "Withdraw",
    icon: <LuArrowUpFromLine className='' />,
    url: '/user/withdrawals'
  },
  {
    name: "Vend Utility",
    icon: <TbBulb className='' />,
    url: '/user/vend_utility'
  },
]


export const headers = [
  {
    name: 'Date'
  },
  {
    name: 'transaction type',
    other: ''
  },
  {
    name: 'Amount'
  },
  {
    name: 'payment method',
    other: ''
  },
  {
    name: 'status',
    other: ''
  }
]
export const dashboardBalances = [
  {
    name: 'Wallet Balance',
    value: '₦45,231.89',
    icon: <LuWallet className='' />,
    desc: 'Last funded 2 days ago'
  },
  {
    name: 'Total Spent',
    value: '₦12,920.50',
    icon: <FaCoins className='' />,
    desc: 'This month'
  },
  {
    name: 'Last Vending',
    value: '₦5,000.50',
    icon: <LuHistory className='' />,
    desc: '2 days ago'
  },
  {
    name: 'Meter status',
    value: 'Active',
    icon: <PiWarningCircle className='' />,
    desc: 'Last checked 1hr ago'
  },
]

// Filter options for the dropdown
export const filterOptions = [
  'Last 7 Days',
  'Last 30 Days',
  'All Time'
]

const Dashboard = () => {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter)
    setOpen(false)
  }

 

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const handleSort = (columnName: any) => {
    let direction = 'ascending';

    if (sortConfig.key === columnName && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key: columnName, direction });

  };


  return (
    <AuthPageLayout>
      <div className="w-full">
        <div className="flex w-full flex-col gap-10 text-[var(--dark)]">
          <div className="w-full flex md:items-center md:flex-row flex-col gap-5 md:gap-0 md:justify-between">
            <div className="flex items-start flex-col gap-1">
              <div className="text-[25px] font-bold">Dashboard</div>
              <div className="text-sm md:text-base">Welcome back, John! Here's an overview of your account.</div>
            </div>
            <div className="flex items-center gap-3">
              {dashboardUrls.map((item, index) => (
                <Link to={item.url} key={index} className={`flex items-center md:gap-2 gap-1 px-4 py-3 md:py-2 rounded-md cursor-pointer ${active === index ? 'bg-[var(--primary)] text-white' : 'border text-[var(--dark)] hover:bg-[var(--primary)]/10'}`} onClick={() => setActive(index)}>
                  <div className="md:text-lg text-sm">{item.icon}</div>
                  <div className="md:text-base text-xs">{item.name}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {dashboardBalances.map((item, index) => {
              // Mobile-only layout for last two items
              if (index === dashboardBalances.length - 2) {
                return (
                  <>
                    {/* Last two as a grid on mobile only */}
                    <div key="mobile-last-two" className="grid grid-cols-2 gap-5 md:hidden col-span-full">
                      {[dashboardBalances[index], dashboardBalances[index + 1]].map((subItem, subIndex) => (
                        <div key={subIndex}
                          className="w-full flex items-start justify-between px-3 py-1.5 border rounded-md border-[#e7e7e7] bg-white">
                          <div className="flex items-start flex-col gap-1">
                            <div className="text-[18px] font-semibold">{subItem.name}</div>
                            <div className="text-xl font-bold">{subItem.value}</div>
                            <div className="text-sm text-[#a7a7a7]">{subItem.desc}</div>
                          </div>
                          <div className="text-2xl md:text-[var(--primary)]">{subItem.icon}</div>
                        </div>
                      ))}
                    </div>

                    {/* Last two for md+ screens */}
                    {[dashboardBalances[index], dashboardBalances[index + 1]].map((item, i) => (
                      <div
                        key={`desktop-${i}`}
                        className="hidden md:flex w-full items-start justify-between px-3 py-1.5 border rounded-md border-[#e7e7e7] bg-white"
                      >
                        <div className="flex items-start flex-col gap-1">
                          <div className="text-[18px] font-semibold">{item.name}</div>
                          <div className="text-xl font-bold">{item.value}</div>
                          <div className="text-sm text-[#a7a7a7]">{item.desc}</div>
                        </div>
                        <div className="text-2xl text-[var(--primary)]">{item.icon}</div>
                      </div>
                    ))}
                  </>
                );
              }

              // Skip rendering the very last item since it was handled above
              if (index === dashboardBalances.length - 1) return null;

              // Render normal item
              return (
                <div key={index}
                  className="w-full flex items-start justify-between px-3 py-1.5 border rounded-md border-[#e7e7e7] bg-white">
                  <div className="flex items-start flex-col gap-1">
                    <div className="text-[18px] font-semibold">{item.name}</div>
                    <div className="text-xl font-bold">{item.value}</div>
                    <div className="text-sm text-[#a7a7a7]">{item.desc}</div>
                  </div>
                  <div className="text-2xl md:text-[var(--primary)]">{item.icon}</div>
                </div>
              );
            })}
          </div>



          <div className="w-full rounded-md border border-[#e7e7e7] p-2 flex items-start flex-col gap-5">
            <div className="flex items-start flex-col gap-1">
              <div className="text-[25px] font-bold">Recent transactions</div>
              <div className="">Your recent wallet activities and utility vending</div>
            </div>

            <div className="flex items-center  w-full gap-4 relative">
              <div className="flex items-center w-3/4 rounded-xl gap-2 px-2 py-1 border-[#e7e7e7] border">
                <LuSearch className='md:text-xl text-lg' />
                <input
                  type='text'
                  className="w-full border-transparent focus-within:outline-none focus:outline-none focus:ring-0 outline-none focus-border-none text-base focus:border-none rounded"
                  placeholder={`Search Transactions`}
                />
              </div>

              {/* Filter Dropdown */}
              <div ref={dropdownRef} className=" md:w-1/4 w-fit ">
                <div
                  onClick={() => setOpen(!open)}
                  className="flex items-center justify-between md:p-4 p-2.5 rounded-md border border-[#e7e7e7] cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 justify-center  w-full">
                    <RiFilterOffFill className='text-2xl  self-center' />
                    <p className='font-semibold hidden md:block'>{selectedFilter || 'Filter By'}</p>
                  </div>
                  <FiChevronDown className={`transition-transform hidden md:block duration-200 ${open ? 'rotate-180' : ''}`} />
                </div>

                {open && (
                  <div className="absolute top-full z-20 right-0 w-2/4 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg  border border-gray-200">
                    {filterOptions.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 md:py-3 py-2 hover:bg-gray-50 text-xs cursor-pointer transition-colors duration-150"
                        onClick={() => handleFilterSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="relative w-full overflow-x-auto shadow-sm border border-[#e7e7e7] sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right ">
                <thead className="text-sm md:text-base capitalize">
                  <tr>
                    {headers.map((item, i) => (
                      <th
                        key={i}
                        scope='col'
                        className={`px-6 py-3 ${item.other !== undefined ? 'cursor-pointer' : ''}`}
                        onClick={() => item.other !== undefined ? handleSort(item.name) : null}
                      >
                        <div className="flex items-center gap-1 truncate">
                          {item.name}
                          {item.other !== undefined && (
                            <span className="inline-block ml-1">
                              {sortConfig.key === item.name ? (
                                sortConfig.direction === 'ascending' ? <FiChevronUp /> : <FiChevronDown />
                              ) : (
                                <FiChevronDown className="text-base font-bold" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>

                  {dashbOardTransactions.map((item, i) => (
                    <tr key={i} className="border-b border-[#e7e7e7] border-t text-sm ">
                      <td className='px-6 py-3 truncate'>{item.date}</td>
                      <td className='px-6 py-3  capitalize'>{item.type}</td>
                      <td className='px-6 py-3 capitalize truncate'>{item.amount}</td>
                      <td className='px-6 py-3 capitalize'>{item.method}</td>
                      <td
                        className={`px-6 py-3 capitalize 
                        ${item.status === 'successful' ? 'text-green-600' : item.status === 'failed' ? 'text-red-600' : 'text-gray-600'} font-semibold`}>{item.status}</td>
                    </tr>

                  ))}

                </tbody>
              </table>
            </div>
            <div className="py-3 w-full flex items-center justify-center">
              <Link to={`/user/history`} className='w-fit rounded-md border border-[#e7e7e7] py-2 px-5'>view all transactions</Link>
            </div>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  )
}

export default Dashboard