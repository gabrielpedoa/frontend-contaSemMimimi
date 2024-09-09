import { IRoutes } from "./@types/route";
import Dashboard from "./pages/dashboard/Dashboard";
import Expenses from "./pages/expenses/Expenses";
import Incomes from "./pages/incomes/Income";
import Users from "./pages/users/Users";
export const routes: IRoutes[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    requireAuth: true,
    requireRoles: [1],
  },
  {
    path: "/entradas",
    element: <Incomes />,
    requireAuth: true,
    requireRoles: [1],
  },
  {
    path: "/despesas",
    element: <Expenses />,
    requireAuth: true,
    requireRoles: [1],
  },
  {
    path: "/usuarios",
    element: <Users />,
    requireAuth: true,
    requireRoles: [1],
  },
];
