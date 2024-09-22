import { apiUrl } from "../utils/apiUrl";

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
