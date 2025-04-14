import AuthPageLayout from '@/components/authComponents/AuthPageLayout'
import { useUserStore } from '@/store/useUserStore';
import React from 'react'

const UserProfile = () => {
  const user= useUserStore((state) => state.user);
  return (
    <AuthPageLayout>
      <div className='flex flex-col gap-4'>
        <div className="">user login details</div>
        <div className="">{user?.firstName}</div>
        <div className="">{user?.email}</div>
        <div className="">{user?.lastName}</div>
        <div className="">{user?.phone}</div>
      </div>

    </AuthPageLayout>
  )
}

export default UserProfile