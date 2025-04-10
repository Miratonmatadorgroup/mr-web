import NotFound from "@/components/generalComponents/NotFound";
import Contact from "@/pages/GeneralPages/Contact";
import FinishSignUp from "@/pages/GeneralPages/FinishSignUp";
import HomePage from "@/pages/GeneralPages/HomePage";
import Signin from "@/pages/GeneralPages/Signin";
import Signup from "@/pages/GeneralPages/Signup";
import Dashboard from "@/pages/AuthPages/Dashboard";
import ForgotPassword from "@/pages/GeneralPages/ForgotPassword";
import Wallet from "@/pages/AuthPages/Wallet";
import Utilities from "@/pages/AuthPages/Utilities";
import History from "@/pages/AuthPages/History";
import UserProfile from "@/pages/AuthPages/UserProfile";
import Help from "@/pages/AuthPages/Help";


export const GeneralPages = [
    { path: '*', component: NotFound },
    { path: `/`, component: HomePage },
    { path: `/signin`, component: Signin },
    { path: `/signup`, component: Signup },
    { path: `/forgot_password`, component: ForgotPassword},
    { path: `/finish_up`, component: FinishSignUp },
    { path: `/contact`, component: Contact },

]

export const AuthPages = [  
    {path: `/user/dashboard`, component: Dashboard},
    {path: `/user/fund_wallet`, component: Wallet},
    {path: `/user/utilities`, component: Utilities},
    {path: `/user/history`, component: History},
    {path: `/user/profile`, component: UserProfile},
    {path: `/user/help`, component: Help},

]