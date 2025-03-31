import NotFound from "../components/generalComponents/NotFound";
import Contact from "../pages/GeneralPages/Contact";
import HomePage from "../pages/GeneralPages/HomePage";





export const GeneralPages = [
    { path: '*', component: NotFound },
    { path:`/`, component: HomePage },
    { path:`/contact`, component: Contact },
    
]