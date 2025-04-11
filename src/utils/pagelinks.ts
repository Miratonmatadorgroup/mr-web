import NotFound from "@/components/generalComponents/NotFound";
import Contact from "@/pages/GeneralPages/Contact";
import FinishSignUp from "@/pages/GeneralPages/FinishSignUp";
import HomePage from "@/pages/GeneralPages/HomePage";
import Signin from "@/pages/GeneralPages/Signin";
import Signup from "@/pages/GeneralPages/Signup";
import Dashboard from "@/pages/AuthPages/Dashboard";
import ForgotPassword from "@/pages/GeneralPages/ForgotPassword";
import Wallet from "@/pages/AuthPages/Wallet";
import History from "@/pages/AuthPages/History";
import UserProfile from "@/pages/AuthPages/UserProfile";
import Help from "@/pages/AuthPages/Help";
import VendUtility from "@/pages/AuthPages/VendUtility";
import ServiceCharge from "@/pages/AuthPages/ServiceCharge";
import ConfirmPurchase from "@/pages/AuthPages/ConfirmPurchase";
import PendingPurchase from "@/pages/AuthPages/PendingPurchase";
import Notifications from "@/pages/AuthPages/Notifications";
import Withdrawals from "@/pages/AuthPages/Withdrawals";


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
    {path: `/user/dashboard/notifications`, component: Notifications},
    {path: `/user/fund_wallet`, component: Wallet},
    {path: `/user/vend_utility`, component: VendUtility},
    {path: `/user/service_charge`, component: ServiceCharge},
    {path: `/user/history`, component: History},
    {path: `/user/profile`, component: UserProfile},
    {path: `/user/help`, component: Help},
    {path: `/user/purchase/confirmation`, component: ConfirmPurchase},
    {path: `/user/purchase/confirmation/:id`, component: PendingPurchase},
    {path: `/user/withdrawals`, component: Withdrawals},

]