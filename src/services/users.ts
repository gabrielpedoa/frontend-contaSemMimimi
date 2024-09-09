import { IUser } from "../@types/user";
import { apiUrl } from "../utils/apiUrl";

export async function createUserService(data: IUser) {
  const response = await apiUrl.post(`/users/create`, data);
  return response;
}
