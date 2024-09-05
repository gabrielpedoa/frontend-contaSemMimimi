import { IRoutes } from "./@types/route";
import Dashboard from "./pages/dashboard/Dashboard";
export const routes: IRoutes[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    requireAuth: true,
    requireRoles: [1],
  },
];
