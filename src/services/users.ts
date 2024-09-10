import { IUser } from "../@types/user";
import { apiUrl } from "../utils/apiUrl";

export async function createUserService(data: IUser) {
  const response = await apiUrl.post(`/users/create`, data);
  return response;
}

export async function deleteUserService(id: string, token: string) {
  const response = await apiUrl.put(`/users/delete/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function updateUserService(data: IUser, token: string) {
  const response = await apiUrl.put(
    `users/update/${String(data.id_user!)}`,
    { ...data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
}

export async function getUsersService(id: string, token: string) {
  try {
    const response = await apiUrl.get(`/users/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
