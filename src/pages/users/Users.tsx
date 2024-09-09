import { IUser } from "../../@types/user";
import ListingItems from "../../components/ListingItems";
import { useFetching } from "../../hooks/useFetching";
import UsersList from "./UsersList";
import { fields } from "./utils/fields";

function Users() {
  const { data: users } = useFetching<IUser[]>({
    url: "/users/list",
  });

  console.log(users);
  return (
    <div>
      <h1>users</h1>
      <ListingItems
        data={users ?? []}
        fields={fields}
        ItemComponent={UsersList}
      />
    </div>
  );
}

export default Users;
