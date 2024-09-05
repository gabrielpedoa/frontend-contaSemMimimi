import { useLayoutEffect, useState } from "react";
import { useAuthHook } from "../context/AuthContext";

export function useVerifyAuth() {
  const { user, token } = useAuthHook();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    setLoading(() => true);
    if (token && user) {
      setAuthenticated(() => true);
    } else {
      setAuthenticated(() => false);
    }
    setLoading(() => false);
  }, [token, user]);

  return {
    authenticated,
    loading,
  };
}
