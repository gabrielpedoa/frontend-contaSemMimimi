import { IUsersListProps } from "../../@types/pages/users";
import { FieldsItems, Items } from "../../components/styles/ListingItems";

function UsersList({ data, fields }: IUsersListProps) {
  const usersData = [
    { value: data.id_user },
    { value: data.name },
    { value: data.role === 1 ? "administrador" : "usuário padrão" },
  ];
  return (
    <Items>
      {fields.map((field, index) => (
        <FieldsItems key={index} width={field.width}>
          {usersData[index]?.value}
        </FieldsItems>
      ))}
    </Items>
  );
}

export default UsersList;
