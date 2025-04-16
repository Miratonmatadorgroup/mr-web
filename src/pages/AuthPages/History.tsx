import AuthPageLayout from '@/components/authComponents/AuthPageLayout'
import { dashbOardTransactions } from '@/components/authComponents/AuthUtils'
import React, { useEffect, useRef, useState } from 'react'
import { headers } from './Dashboard'
import { LuSearch } from 'react-icons/lu'
import { RiFilterOffFill } from 'react-icons/ri'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const History = () => {

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const filterOptions = [
    'Last 7 Days',
    'Last 30 Days',
    'All Time'
  ]

  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('')

  const handleSort = (columnName: any) => {
    let direction = 'ascending';

    if (sortConfig.key === columnName && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key: columnName, direction });

  };

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
  const navigate = useNavigate();


  const [filteredData,setFilteredData] = useState(dashbOardTransactions)

  // const 

  
  return (
    <AuthPageLayout>
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
              className="flex items-center justify-between md:p-4 p-3 rounded-md border border-[#e7e7e7] cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 justify-center  w-full">
                <RiFilterOffFill className='text-2xl  self-center' />
                <p className='font-semibold hidden md:block'>{selectedFilter || 'Filter By'}</p>
              </div>
              <FiChevronDown
               className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </div>

            {open && (
              <div className="absolute top-full z-20 right-0  md:w-1/4 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg  border border-gray-200">
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
                    <div className="flex items-center  gap-1 truncate">
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
                <tr key={i} 
                onClick={()=> navigate(`/user/history/${item.type.replace(/\s+/g, "_")}/${i+1}`)}
                className="border-b cursor-pointer border-[#e7e7e7] border-t text-sm ">
                  <td className='px-6 py-3 truncate'>{item.date}</td>
                  <td className='px-6 py-3  capitalize'>{item.type}</td>
                  <td className='px-6 py-3 capitalize truncate'>{item.amount}</td>
                  <td className='px-6 py-3 capitalize'>{item.method}</td>
                  <td
                    className={`px-6 py-3 capitalize 
                              ${item.status === 'successful' ? 'text-[#15803d]' : item.status === 'failed' ? 'text-red-600' : 'text-gray-600'} font-semibold`}>{item.status}</td>
                </tr>

              ))}

            </tbody>
          </table>
        </div>
      </div>
    </AuthPageLayout>
  )
}

export default History