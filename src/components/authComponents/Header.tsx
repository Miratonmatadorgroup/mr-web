import { useEffect, useRef, useState } from "react";
import logo from "@/assets/generalImages/miraton-logo.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import {
  CapitalizeFirstLetter,
  CapitalizeFirstLetterOfEachWord,
} from "@/utils/helper/formatString";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { sidebarNavItems } from "./SideBar";
import { IoChevronDown } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const user = useUserStore((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [openUtilities, setOpenUtilities] = useState(false);
  const refDiv = useRef<HTMLDivElement | null>(null);

  // Detect if we're on a utilities page to keep the submenu open
  const pathName = useLocation().pathname;
  useEffect(() => {
    if (
      pathName.includes("/user/vend_utility") ||
      pathName.includes("/user/service_charge")
    ) {
      setOpenUtilities(true);
    }
  }, [pathName]);

  // Toggle the utilities submenu
  const toggleUtilities = (e: any) => {
    e.preventDefault();
    setOpenUtilities((prev) => !prev);
  };

  const Icon = open ? (
    <RiCloseLargeFill
      onClick={() => setOpen(false)}
      className={`text-3xl font-bold text-[var(--primary)] cursor-pointer transform transition-transform duration-300 ease-in-out ${
        open ? "rotate-180" : "rotate-0"
      }`}
    />
  ) : (
    <HiMiniBars3BottomLeft
      onClick={() => setOpen(true)}
      className={`text-3xl font-bold text-[var(--primary)] cursor-pointer transform transition-transform duration-300 ease-in-out ${
        open ? "rotate-180" : "rotate-0"
      }`}
    />
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (refDiv.current && !refDiv.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside, true);

    return () => {
      window.removeEventListener("click", handleClickOutside, true);
    };
  }, [setOpen]);

  return (
    <div className="w-full py-4 shadow-sm relative bg-white ">
      <div
        ref={refDiv}
        className={`fixed top-19 left-0 z-50 h-[90dvh] w-3/4 bg-white border border-[var(--gray)] rounded-tr-3xl rounded-b-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full p-4 flex items-start flex-col gap-3">
          {sidebarNavItems.map((item, index) => (
            <div key={index} className="w-full">
              {item.other ? (
                <div
                  className="w-full flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-[#f5f5f5]"
                  onClick={toggleUtilities}
                >
                  <div>{item.icon}</div>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-base font-semibold">{item.name}</div>
                    <IoChevronDown
                      className={`text-xl transition-transform ${
                        openUtilities ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <Link
                  to={item.url}
                  className={`w-full flex items-center gap-4 p-2 rounded-md cursor-pointer ${
                    pathName === item.url || pathName === item.main
                      ? "bg-[var(--primary)] text-white"
                      : "hover:bg-[#f5f5f5]"
                  }`}
                >
                  <div>{item.icon}</div>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-base font-semibold">{item.name}</div>
                  </div>
                </Link>
              )}

              {item.other && openUtilities && (
                <div className="flex flex-col gap-2 pl-10 mt-1">
                  {item.other.map((subItem, subIndex) => (
                    <Link
                      to={subItem.url}
                      key={subIndex}
                      className={`w-full text-sm flex items-center gap-4 p-2 rounded-md cursor-pointer ${
                        pathName === subItem.url
                          ? "bg-[var(--primary)] text-white"
                          : "hover:bg-[#f5f5f5]"
                      }`}
                    >
                      <div>{subItem.icon}</div>
                      <div className="text-base font-semibold">
                        {subItem.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[95%] mx-auto z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {Icon}
          <Link to={`/user/dashboard`}>
            <img src={logo} alt="miraton rose logo" className="w-24" />
          </Link>
        </div>
        <div className=" flex items-center gap-4">
          <Link to={`/user/dashboard/notifications`} className="relative">
            <IoIosNotificationsOutline className="text-3xl cursor-pointer " />
            <div className="w-4 h-4 text-[10px] absolute top-0 right-0 rounded-full flex items-center justify-center font-semibold bg-[var(--primary)] text-white">
              0
            </div>
          </Link>

          {/* Profile  */}

          {user ? (
            <div className="flex items-center gap-4">
              <Link to={`/user/profile`}>
                {/* Change to userImage */}
                <RxAvatar size={32} />
              </Link>
              <div className="md:flex items-start flex-col gap-1 hidden ">
                <div className="font-bold text-sm">
                  {CapitalizeFirstLetterOfEachWord([
                    user.firstName,
                    user.lastName,
                  ])}
                </div>
                <div className="text-sm">
                  {CapitalizeFirstLetter(user.email)}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={`/user/profile`}>
                <RxAvatar size={32} />
              </Link>
              <div className="flex items-start flex-col gap-1">
                <div className="font-bold text-sm">Guest</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
