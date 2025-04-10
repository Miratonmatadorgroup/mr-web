import NotFound from "@/components/generalComponents/NotFound";
import Contact from "@/pages/GeneralPages/Contact";
import FinishSignUp from "@/pages/GeneralPages/FinishSignUp";
import HomePage from "@/pages/GeneralPages/HomePage";
import Signin from "@/pages/GeneralPages/Signin";
import Signup from "@/pages/GeneralPages/Signup";
import Dashboard from "@/pages/AuthPages/Dashboard";
import ForgotPassword from "@/pages/GeneralPages/ForgotPassword";


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

]