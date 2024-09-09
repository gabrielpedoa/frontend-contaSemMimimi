import { useEffect, useState } from "react";
import { IUseFetching } from "../@types/hooks/useFetching";
import { apiUrl } from "../utils/apiUrl";
import { AxiosError } from "axios";
import { useAuthHook } from "../context/AuthContext";

export function useFetching<T>({
  url,
  depedences = [],
  request = true,
}: IUseFetching) {
  const { token } = useAuthHook();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!loading) setLoading(true);
      if (request) await fetch();
      setLoading(() => false);
    })();
  }, [...depedences]);

  async function fetch() {
    try {
      if (error) setError(() => null);
      const response = await apiUrl.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
      const { response } = error as AxiosError<string>;
      if (response?.status === 404) {
        setData(() => null);
        setError("Não encontrado!");
      }
      if (response?.data) setError(response?.data);
    }
  }

  function updateData(item: T) {
    setData(item);
  }

  return {
    data,
    loading,
    error,
    updateData,
  };
}
