import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Unarchive from "@material-ui/icons/Unarchive";
import DashboardPage from "views/Dashboard/Dashboard";
import Configuration from "views/Configuration/Configuration";
import Employees from "./views/Employees/Employees";
import Analytics from "views/Analytics/Analytics";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "OVERVIEW",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/employees",
    name: "EMPLOYEES",
    icon: "content_paste",
    component: Employees,
    layout: "/admin",
  },
  {
    path: "/analytics",
    name: "ANALYTICS",
    icon: BubbleChart,
    component: Analytics,
    layout: "/admin",
  },
  {
    path: "/upgrade-to-pro",
    name: "PRO",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin",
  },
  {
    path: "/configuration",
    name: "CONFIGURATION",
    icon: Person,
    component: Configuration,
    layout: "/admin",
  },
];

export default dashboardRoutes;
