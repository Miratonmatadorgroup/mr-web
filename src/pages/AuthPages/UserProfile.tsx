import AuthPageLayout from '@/components/authComponents/AuthPageLayout'
import { useUserStore } from '@/store/useUserStore';
import React, { useEffect, useState } from 'react'
import image from '@/assets/authImages/user_image.png'
import { FiUser } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import FormInput from '@/utils/FormInput';
import FormButton from '@/utils/FormButton';
import { UserPrivacySharing, UserPrivacyVisibility, UserProfileNotifications, UserProfileSms, UserProfileWhatsapp } from '@/components/authComponents/AuthUtils';
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";



const localName = 'profilescreen'
const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const [forms, setForms] = useState({
    fullname: "", email: '', phoneNumber: '', address: '',
  })
  const [security, setSecurity] = useState({
    current_password: "", new_password: '', confirm_new_password: '', new_email: '', otp: ''
  })
  const [userImage, setUserImage] = useState({
    img: image, image: null
  })

  const userOptions = [
    {
      name: "personal info",
      icon: FiUser
    },
    {
      name: "security",
      icon: CiLock
    },
    {
      name: "notifications",
      icon: IoIosNotificationsOutline
    },
    {
      name: "privacy",
      icon: MdOutlinePrivacyTip
    },

  ]

  const [notifications, setNotifications] = useState(UserProfileNotifications);
  const [smsnotify, setSmsNotify] = useState(UserProfileSms);
  const [whatsappNotify, setWhatsAppNotify] = useState(UserProfileWhatsapp);
  const [datasharing, setDataSharing] = useState(UserPrivacySharing);
  const [datavisibility, setDataVisibility] = useState(UserPrivacyVisibility);

  const toggleNotification = (tag: string, index: number) => {
    if (tag === 'email') {
      const updated = [...notifications];
      updated[index].allowed = !updated[index].allowed;
      setNotifications(updated);
    } else if (tag === 'sms') {
      const updated = [...smsnotify];
      updated[index].allowed = !updated[index].allowed;
      setSmsNotify(updated);
    } else if (tag === 'whatsapp') {
      const updated = [...whatsappNotify];
      updated[index].allowed = !updated[index].allowed;
      setWhatsAppNotify(updated);
    }
    else if (tag === 'datashare') {
      const updated = [...datasharing];
      updated[index].allowed = !updated[index].allowed;
      setDataSharing(updated);
    } else {
      const updated = [...datavisibility];
      updated[index].allowed = !updated[index].allowed;
      setDataVisibility(updated);
    }
  };
  const [active, setActive] = useState(() => (
    localStorage.getItem(localName) || userOptions[0].name
  )
  )


  useEffect(() => {
    localStorage.setItem(localName, active);
  }, [active]);
  return (
    <AuthPageLayout>
      <div className="w-full flex flex-col gap-1">
        <div className="text-[20px] font-bold">Your Profile</div>
        <div>Manage your account settings and preferences</div>

        <div className="flex flex-col lg:flex-row w-full overflow-hidden gap-5 my-5">
          {/* Left content */}
          <div className="lg:w-2/5  p-3 min-h-[100dvh] rounded-md border border-[var(--gray)]">
            <div className="w-full flex items-center flex-col gap-7 py-5">
              <img src={userImage.img} alt="user avatar" />
              <div className="flex items-center flex-col gap-1">
                <div className="font-bold">{user?.firstName} {user?.lastName}</div>
                <div className="">{user?.email}</div>
              </div>
              <button className='w-full py-2 rounded-md border cursor-pointer border-[var(--gray)]'>Change Photo</button>
              <hr className='border-0 bg-[#e5eaf0] w-full h-[2px]' />
              <div className="w-full flex items-start flex-col gap-5">
                {userOptions.map((user, i) => (
                  <div
                    onClick={() => setActive(user.name)}
                    key={i} className={`flex w-full p-2 rounded-md items-center gap-4 cursor-pointer 
                    ${active === user.name ? 'bg-[var(--gray)]' : 'hover:bg-[var(--litegray)]'} `}>
                    <div className="text-2xl">{React.createElement(user.icon)}</div>
                    <div className="text-base capitalize md:text-lg">{user.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 p-3 min-h-[100dvh] overflow-auto rounded-md border border-[var(--gray)]">
            {/* Right content */}
            {active === userOptions[0].name &&
              <div className="w-full">
                <div className="text-[20px] font-bold capitalize">{userOptions[0].name}</div>
                <div>Update your personal details</div>
                <form className="mt-10 w-full grid grid-cols-1 gap-5">
                  <FormInput
                    name='fullname'
                    label='Full Name'
                    bold={false}
                    value={forms.fullname}
                    placeholder='Raheem John'
                    backbg={false}
                  />

                  <FormInput
                    name='email'
                    label='Email'
                    type='email'
                    bold={false}
                    value={forms.email}
                    placeholder='RaheemJohn@gmail.com'
                    backbg={false}
                  />
                  <FormInput
                    name='phoneNumber'
                    label='Phone Number'
                    bold={false}
                    value={forms.phoneNumber}
                    placeholder='0123456789'
                    backbg={false}
                  />
                  <FormInput
                    name='address'
                    label='Address'
                    bold={false}
                    value={forms.address}
                    placeholder='House 1, Miraton Estate, Lekki, Lagos'
                    backbg={false}
                  />

                  <FormButton type='button' title='Save Changes' className='!w-fit px-4 !py-1.5' />
                </form>
              </div>

            }
            {active === userOptions[1].name &&
              <div className="w-full">
                <div className="text-[20px] font-bold capitalize">{userOptions[1].name}</div>
                <div>Manage your password and security settings</div>

                <form className="mt-10 w-full grid grid-cols-1 gap-5">
                  <FormInput
                    name='current_password'
                    label='Current Password'
                    bold={false}
                    value={security.current_password}
                    placeholder='Enter current password'
                    backbg={false}
                  />

                  <FormInput
                    name='new_password'
                    label='New Password'
                    type='password'
                    bold={false}
                    value={security.new_password}
                    placeholder='Enter new password'
                    backbg={false}
                  />
                  <FormInput
                    name='confirm_new_password'
                    label='Confirm new password'
                    bold={false}
                    type='password'
                    value={security.confirm_new_password}
                    placeholder='Confirm new password'
                    backbg={false}
                  />

                  <hr className='border-0 bg-[#e5eaf0] w-full h-[2px]' />

                  <div className="font-bold">Change Email Address</div>
                  <div className="flex w-full flex-col lg:flex-row lg:items-end gap-2 lg:gap-5">
                    <div className="lg:w-4/6">
                      <FormInput
                        name='new_email'
                        label='Enter new email address'
                        bold={false}
                        type='email'
                        value={security.new_email}
                        placeholder='Enter new email'
                        backbg={false}
                      />
                    </div>
                    <FormButton title='Send verification code' className='!lg:w-2/6 !w-1/2  !px-2 !text-sm' />
                  </div>
                  <FormInput
                    name='otp'
                    label='Enter verification code'
                    bold={false}
                    value={security.otp}
                    placeholder='Enter new email'
                    backbg={false}
                  />
                  <FormButton type='button' title='Save Changes' className='!w-fit px-4 !py-1.5' />
                </form>
              </div>

            }
            {active === userOptions[2].name &&
              <div className="w-full">
                <div className="text-[20px] font-bold capitalize">{userOptions[2].name}</div>
                <div>Manage how you receive notifications</div>
                <div className="mt-5 w-full items-start flex flex-col gap-3">

                  <div className="text-[18px] fotn-bold ">Email Notifications</div>
                  <div className="flex w-full flex-col gap-3">
                    {notifications.map((item, i) => (
                      <div
                        key={i}
                        className="w-full flex items-center justify-between transition-all duration-300"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-base">{item.title}</div>
                          <div className='text-sm text-[#9da8b6]'>{item.desc}</div>
                        </div>
                        {item.allowed ? (
                          <LiaToggleOnSolid
                            onClick={() => toggleNotification('email', i)}
                            className="text-3xl cursor-pointer text-[var(--primary)] transition-all duration-1000 delay-500"
                          />
                        ) : (
                          <LiaToggleOffSolid
                            onClick={() => toggleNotification('email', i)}
                            className="text-3xl cursor-pointer text-gray-400 transition-all duration-1000 delay-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <hr className='border-0 bg-[#e5eaf0] w-full h-[2px]' />
                  <div className="text-[18px] fotn-bold ">SMS Notifications</div>
                  <div className="flex w-full flex-col gap-3">
                    {smsnotify.map((item, i) => (
                      <div
                        key={i}
                        className="w-full flex items-center justify-between transition-all duration-300"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-base">{item.title}</div>
                          <div className='text-sm text-[#9da8b6]'>{item.desc}</div>
                        </div>
                        {item.allowed ? (
                          <LiaToggleOnSolid
                            onClick={() => toggleNotification('sms', i)}
                            className="text-3xl cursor-pointer text-[var(--primary)] transition-all duration-1000 delay-500"
                          />
                        ) : (
                          <LiaToggleOffSolid
                            onClick={() => toggleNotification('sms', i)}
                            className="text-3xl cursor-pointer text-gray-400 transition-all duration-1000 delay-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <hr className='border-0 bg-[#e5eaf0] w-full h-[2px]' />
                  <div className="text-[18px] fotn-bold ">Whatsapp Notifications</div>
                  <div className="flex w-full flex-col gap-3">
                    {whatsappNotify.map((item, i) => (
                      <div
                        key={i}
                        className="w-full flex items-center justify-between transition-all duration-300"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-base">{item.title}</div>
                          <div className='text-sm text-[#9da8b6]'>{item.desc}</div>
                        </div>
                        {item.allowed ? (
                          <LiaToggleOnSolid
                            onClick={() => toggleNotification('whatsapp', i)}
                            className="text-3xl cursor-pointer text-[var(--primary)] transition-all duration-1000 delay-500"
                          />
                        ) : (
                          <LiaToggleOffSolid
                            onClick={() => toggleNotification('whatsapp', i)}
                            className="text-3xl cursor-pointer text-gray-400 transition-all duration-1000 delay-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <FormButton type='button' title='Save Preferences' className='!w-fit px-4 !py-1.5 !mt-3' />


                </div>
              </div>

            }
            {active === userOptions[3].name &&
              <div className="w-full">
                <div className="text-[20px] font-bold capitalize">{userOptions[3].name}</div>
                <div>Control your data and privacy preferences</div>
                <div className="mt-5 w-full flex items-start flex-col gap-5">
                  <div className="text-[18px] fotn-bold ">Data Sharing</div>
                  <div className="flex w-full flex-col gap-3">
                    {datasharing.map((item, i) => (
                      <div
                        key={i}
                        className="w-full flex items-center justify-between transition-all duration-300"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-base">{item.title}</div>
                          <div className='max-w-4/6  text-sm text-[#9da8b6]'>{item.desc}</div>
                        </div>
                        {item.allowed ? (
                          <LiaToggleOnSolid
                            onClick={() => toggleNotification('datashare', i)}
                            className="text-3xl cursor-pointer text-[var(--primary)] transition-all duration-1000 delay-500"
                          />
                        ) : (
                          <LiaToggleOffSolid
                            onClick={() => toggleNotification('datashare', i)}
                            className="!text-3xl cursor-pointer text-gray-400 transition-all duration-1000 delay-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <hr className='border-0 bg-[#e5eaf0] w-full h-[2px]' />
                  <div className="text-[18px] fotn-bold ">Account Visibility</div>
                  <div className="flex w-full flex-col gap-3">
                    {datavisibility.map((item, i) => (
                      <div
                        key={i}
                        className="w-full flex items-center justify-between transition-all duration-300"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="font-bold text-base">{item.title}</div>
                          <div className='max-w-5/6 text-sm text-[#9da8b6]'>{item.desc}</div>
                        </div>
                        {item.allowed ? (
                          <LiaToggleOnSolid
                            onClick={() => toggleNotification('visibility', i)}
                            className="text-3xl cursor-pointer text-[var(--primary)] transition-all duration-1000 delay-500"
                          />
                        ) : (
                          <LiaToggleOffSolid
                            onClick={() => toggleNotification('visibility', i)}
                            className="text-3xl cursor-pointer text-gray-400 transition-all duration-1000 delay-500"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <hr className='border-0 bg-[#e5eaf0] w-full h-[2px]' />
                  <div className="text-[18px] fotn-bold ">Data Management</div>
                  <div className="rounded-md w-full border border-[var(--gray)] p-3">
                    <div className="flex w-full flex-col gap-2 items-start">
                      <div className="flex w-full flex-col gap-1 items-start">
                        <div className="text-[20px] font-bold text-red-600 capitalize">Delete Account</div>
                        <div className='text-sm'>Permanently delete your account and all associated data. This action cannot be undone.</div>
                      </div>
                      <button className='w-fit cursor-pointer px-5 rounded-md border border-[var(--gray)] py-2'>Delete</button>
                    </div>
                  </div>
                  <FormButton type='button' title='Save Privacy Settings' className='!w-fit px-4 !py-1.5 !mt-3' />

                </div>
              </div>

            }
          </div>
        </div>
      </div>


    </AuthPageLayout>
  )
}

export default UserProfile