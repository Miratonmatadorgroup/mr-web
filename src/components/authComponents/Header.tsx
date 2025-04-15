import logo from "@/assets/generalImages/miraton-logo.png";
import userImage from "@/assets/authImages/user_image.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import {
  CapitalizeFirstLetter,
  CapitalizeFirstLetterOfEachWord,
} from "@/utils/helper/formatString";

const Header = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="w-full py-4 shadow-sm bg-white">
      <div className="w-[95%] mx-auto  flex items-center justify-between">
        <div className="">
          <img src={logo} alt="miraton rose logo" className="w-24" />
        </div>
        <div className=" flex items-center gap-4">
          <Link to={`/user/dashboard/notifications`} className="relative">
            <IoIosNotificationsOutline className="text-3xl cursor-pointer " />
            <div className="w-4 h-4 text-[10px] absolute top-0 right-0 rounded-full flex items-center justify-center font-semibold bg-[var(--primary)] text-white">
              4
            </div>
          </Link>

          {/* Profile  */}
          <div className="flex items-center gap-4">
            <img src={userImage} alt="user image" className="cursor-pointer" />
            {user ? (
              <div className="flex items-start flex-col gap-1">
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
            ) : (
              <div className="flex items-start flex-col gap-1">
                <div className="font-bold text-sm">Guest</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
