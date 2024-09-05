import { createContext, useContext, useLayoutEffect, useState } from "react";
import { IUser } from "../@types/user";
import { TOKEN_KEY, USER_KEY } from "../constants/keys";
import { apiUrl } from "../utils/apiUrl";
import { AxiosError } from "axios";

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  authService: (email: string, password: string) => Promise<void>;
  loading: boolean;
  logout: () => void;
  handleUpdateUser: (user: IUser) => void;
}

interface ErrorResponse {
  errorMessage?: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const storageToken = localStorage.getItem(TOKEN_KEY);
    const storageUser = localStorage.getItem(USER_KEY);
    if (storageToken && storageUser) {
      setToken(() => storageToken);
      const parsedUser: IUser = JSON.parse(storageUser);
      setUser(() => parsedUser);
    }
    if (loading) setLoading(() => false);
  }, []);

  async function authService(email: string, password: string) {
    setLoading(() => true);
    try {
      const response = await apiUrl.post<{ token: string; user: IUser }>(
        "/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      if (token && user) {
        makeStorage(token, TOKEN_KEY, false);
        makeStorage(user, TOKEN_KEY, true);
        setToken(() => token);
        setUser(() => user);
      }
    } catch (error) {
      const { response } = error as AxiosError<string>;
      const err = (response?.data as ErrorResponse)?.errorMessage;
      alert(err);
    } finally {
      setLoading(() => false);
    }
  }

  function handleUpdateUser(user: IUser) {
    setUser(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function logout() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(() => null);
    setToken(() => null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        authService,
        loading,
        logout,
        handleUpdateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function makeStorage<T>(data: T, key: string, stringfy: boolean) {
  let value: string | T = data;
  if (stringfy) value = JSON.stringify(data);
  localStorage.setItem(key, value as string);
}

export function useAuthHook() {
  const context = useContext(AuthContext);
  return context;
}
