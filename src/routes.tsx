import { IRoutes } from "./@types/route";
import Dashboard from "./pages/dashboard/Dashboard";
import Expenses from "./pages/expenses/Expenses";
import CreateAndEditIncome from "./pages/incomes/CreateAndEditIncome";
import Incomes from "./pages/incomes/Income";
import IncomeCategory from "./pages/incomes/IncomeCategory";
import RegisterOrUpdateUser from "./pages/users/CreateAndEditUser";
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
    path: "/entradas/cadastro",
    element: <CreateAndEditIncome />,
    requireAuth: true,
    requireRoles: [1],
  },
  {
    path: "/entradas/editar/:id_income",
    element: <CreateAndEditIncome />,
    requireAuth: true,
    requireRoles: [1],
  },
  {
    path: "/entradas/categoria",
    element: <IncomeCategory />,
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
  {
    path: "/usuarios/cadastro",
    element: <RegisterOrUpdateUser />,
    requireAuth: true,
    requireRoles: [1],
  },
  {
    path: "/usuarios/editar/:id_user",
    element: <RegisterOrUpdateUser />,
    requireAuth: true,
    requireRoles: [1],
  },
];
