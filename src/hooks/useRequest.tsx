import { AxiosError } from "axios";
import { useState } from "react";
import { apiUrl } from "../utils/apiUrl";

interface IRequestType {
  type: "create" | "update" | "loadAll" | "loadById" | "delete";
}

interface IUseRequest {
  token: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

interface ErrorMessage {
  errorMessage?: string;
}

export function useRequest<T>({ token, onSuccess, onError }: IUseRequest) {
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = async (
    url: string,
    type: IRequestType["type"],
    data?: T
  ) => {
    setLoading(() => true);
    try {
      let response;
      const headersConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const requestType = {
        create: () => apiUrl.post(url, data, headersConfig),
        update: () => apiUrl.put(url, data, headersConfig),
        delete: () => apiUrl.put(url, data, headersConfig),
        loadAll: () => apiUrl.get(url, headersConfig),
        loadById: () => apiUrl.get(url, headersConfig),
      };

      response = await requestType[type]();

      onSuccess(response.data);
    } catch (error) {
      const message = extractErrorMessages(error);
      onError(message);
    } finally {
      setLoading(() => false);
    }
  };

  function extractErrorMessages(error: unknown) {
    const zodErrors = [];
    const { response } = error as AxiosError<string>;
    const err = (response?.data as ErrorMessage)?.errorMessage;
    if (Array.isArray(err)) {
      for (const item of err) {
        zodErrors.push(item.message);
      }
    }
    return zodErrors.length > 0 ? zodErrors.join("| ") : String(err);
  }

  return { makeRequest, loading };
}
