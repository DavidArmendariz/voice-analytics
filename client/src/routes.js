import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Unarchive from "@material-ui/icons/Unarchive";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Employees from "./views/Employees/Employees";
import Icons from "views/Icons/Icons.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "OVERVIEW",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/employees",
    name: "EMPLOYEES",
    icon: "content_paste",
    component: Employees,
    layout: "/admin"
  },
  {
    path: "/analytics",
    name: "ANALYTICS",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/upgrade-to-pro",
    name: "PRO",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  },
  {
    path: "/configuration",
    name: "CONFIGURATION",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  }
];

export default dashboardRoutes;
