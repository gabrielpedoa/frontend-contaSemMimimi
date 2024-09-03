export type IRoutes = {
  path: string;
  element: JSX.Element;
  requireAuth: boolean;
  requireRoles: number[];
};
