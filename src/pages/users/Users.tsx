import { IUser } from "../../@types/user";
import ListingItems from "../../components/ListingItems";
import { useFetching } from "../../hooks/useFetching";
import { AddUserButton, UsersContainer } from "./styles";
import UsersList from "./UsersList";
import { fields } from "./utils/fields";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function Users() {
  const { data: users } = useFetching<IUser[]>({
    url: "/users/list",
  });

  console.log(users);
  return (
    <UsersContainer>
      <h1>usuários</h1>
      <AddUserButton>
        <PersonAddIcon sx={{ fontSize: "1em", color: "green" }} />
        <p>cadastrar novo usuário</p>
      </AddUserButton>
      <ListingItems
        data={users ?? []}
        fields={fields}
        ItemComponent={UsersList}
      />
    </UsersContainer>
  );
}

export default Users;
