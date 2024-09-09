import { IFields } from "../../@types/components/ListingItems";
import { IUser } from "../../@types/user";
import { FieldsItems, Items } from "../../components/styles/ListingItems";

interface props {
  data: IUser;
  fields: IFields[];
}
function UsersList({ data, fields }: props) {
  const usersData = [
    { value: data.id_user },
    { value: data.name },
    { value: data.role === 1 ? "administrador" : "Usuário Padrão" },
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
