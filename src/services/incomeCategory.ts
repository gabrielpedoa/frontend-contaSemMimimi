import { IIncomeCategory } from "../@types/incomeCategory";
import { apiUrl } from "../utils/apiUrl";

export async function createIncomeCategoryService(
  data: IIncomeCategory,
  token: string
) {
  return await apiUrl.post("/income-category/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
