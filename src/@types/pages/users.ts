import { IFields } from "../components/ListingItems";
import { IUser } from "../user";

export interface IUsersListProps {
  data: IUser;
  fields: IFields[];
}
