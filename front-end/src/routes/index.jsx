import DefaultLayout from "../layout/Default";
import PersonalLayout from "../layout/Dashboard";
import ScratchLayout from "../layout/Scratch/index.jsx";
import LandingLayout from "../layout/Landing/index.jsx";
import NullLayout from "../layout/NullLayout/index.jsx";
// import pages
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/index.jsx";
import Profile from "../pages/Profile";
import Create from "../pages/Dashboard/Create/index.jsx";
import Overview from "../pages/Dashboard/Overview/index.jsx";
import Campaigns from "../pages/Dashboard/Campaigns/index.jsx";
import Audience from "../pages/Dashboard/Audience/index.jsx";
import ResetPassword from "../pages/Auth/reset-password";
import ChangePassword from "../pages/Auth/change-password";
import Editor from "../pages/Dashboard/Campaigns/Editor/index.jsx";
import CreateCampaign from "../pages/Dashboard/Campaigns/create.jsx";
import ReturnPayment from "../pages/Profile/Payment/return.jsx";
import ProceedPlan from "../pages/ProceedPlan/index.jsx";
import About from "../pages/about.jsx";
import Contact from "../pages/contact.jsx";
import Support from "../pages/support.jsx";
import LandingPage from "../pages/Dashboard/LandingPage/index.jsx";
import SEO from "../pages/Dashboard/Audience/seo.jsx";
import PageSpeed from "../pages/Dashboard/Audience/pagespeed.jsx";
import Templates from "../pages/Dashboard/Templates/index.jsx";
import CreateTemplate from "../pages/Dashboard/Templates/Create/index.jsx";
import TemplatePage from "../pages/Dashboard/Templates/Edit/index.jsx";
import TemplateLayout from "../layout/Template/index.jsx";
import FormBlacklist from "../pages/form-blacklist.jsx";
import Publish from "../pages/Dashboard/LandingPage/publish.jsx";
// export routes
export const AUTH = [
    { path: "/profile", element: Profile, layout: DefaultLayout },
    { path: "/dashboard", element: Overview, layout: PersonalLayout },
    { path: "/dashboard/create", element: Create, layout: PersonalLayout },
    { path: "/dashboard/overview", element: Overview, layout: PersonalLayout },
    { path: "/dashboard/campaigns", element: Campaigns, layout: PersonalLayout },
    { path: "/dashboard/campaigns/editor", element: Editor, layout: ScratchLayout },
    { path: "/dashboard/campaigns/create", element: CreateCampaign, layout: PersonalLayout },
    { path: "/dashboard/audience/all-contacts", element: Audience, layout: PersonalLayout },
    { path: "/dashboard/audience/seo-checker", element: SEO, layout: PersonalLayout },
    { path: "/planning", element: ProceedPlan, layout: DefaultLayout },
    { path: "/dashboard/landing", element: LandingPage, layout: LandingLayout },
    { path: "/dashboard/audience/page-speed-insight", element: PageSpeed, layout: PersonalLayout },
    { path: "/dashboard/templates", element: Templates, layout: PersonalLayout },
    { path: "/dashboard/templates/create", element: CreateTemplate, layout: PersonalLayout },
    { path: "/dashboard/templates/scratch", element: TemplatePage, layout: TemplateLayout },

];

export const PUBLIC = [
    { path: "/login", element: Login, layout: DefaultLayout },
    { path: "/register", element: Register, layout: DefaultLayout },
    { path: "/reset-password", element: ResetPassword, layout: DefaultLayout },
    { path: "/recover", element: ChangePassword, layout: DefaultLayout },
    { path: "/vnpay/return", element: ReturnPayment, layout: DefaultLayout },
    { path: "/about", element: About, layout: DefaultLayout },
    { path: "/contact", element: Contact, layout: DefaultLayout },
    { path: "/support", element: Support, layout: DefaultLayout },
    { path: "/blacklist", element: FormBlacklist, layout: DefaultLayout},
    { path: "/landing", element: Publish, layout: NullLayout},
    { path: "/", element: Home, layout: DefaultLayout }
];