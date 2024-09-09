import { IUsersListProps } from "../../@types/pages/users";
import { FieldsItems, Items } from "../../components/styles/ListingItems";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function UsersList({ data, fields }: IUsersListProps) {
  const usersData = [
    { value: data.id_user },
    { value: data.name },
    { value: data.role === 1 ? "administrador" : "usuário padrão" },
    {
      value: (
        <EditIcon sx={{ fontSize: "1em", color: "blue", cursor: "pointer" }} />
      ),
    },
    {
      value: (
        <DeleteIcon sx={{ fontSize: "1em", color: "red", cursor: "pointer" }} />
      ),
    },
  ];
  return (
    <Items>
      {fields.map((field, index) => (
        <FieldsItems key={index} w={field.w}>
          {usersData[index]?.value}
        </FieldsItems>
      ))}
    </Items>
  );
}

export default UsersList;
