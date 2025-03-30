import NotFound from "../components/generalComponents/NotFound";
import AboutUs from "../pages/GeneralPages/AboutUs";
import Blogs from "../pages/GeneralPages/Blogs.";
import Contact from "../pages/GeneralPages/Contact";
import HomePage from "../pages/GeneralPages/HomePage";
import Products from "../pages/GeneralPages/Products";
import Projects from "../pages/GeneralPages/Projects";




export const GeneralPages = [
    { path: '*', component: NotFound },
    { path:`/`, component: HomePage },
    { path:`/about`, component: AboutUs },
    { path:`/products`, component: Products },
    { path:`/projects`, component: Projects },
    { path:`/contact`, component: Contact },
    { path:`/blogs`, component: Blogs },
]