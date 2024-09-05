import { useNavigate } from "react-router-dom";
import { useAuthHook } from "../context/AuthContext";
import { routes } from "../routes";

export function useVerifyHaveAccess() {
  const { user } = useAuthHook();
  const navigate = useNavigate();
  return (route: string) => {
    const currentRoute = routes.find((r) => r.path === route);
    if (currentRoute) {
      if (currentRoute.requireRoles.length > 0) {
        if (!user) {
          return true;
        }
        if (!currentRoute.requireRoles.includes(user.role)) {
          const haveAccessTo = routes.find((r) =>
            r.requireRoles.includes(user.role)
          );
          navigate(haveAccessTo?.path ?? "/auth");
        }
      }
    }
    return true;
  };
}
