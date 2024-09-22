import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../@types/user";
import Loading from "../../components/Loading";
import { useFetching } from "../../hooks/useFetching";
import {
  AddRegisterButton,
  DefaultFormContainer,
} from "../../styles/GlobalStyles";
import { UsersListButton } from "./styles/users";
import HeaderComponent from "../../components/HeaderComponent";

function Users() {
  const { data: users } = useFetching<IUser[]>({
    url: "/users/list",
  });

  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent title="usuários" route="/dashboard" />
      <DefaultFormContainer width={65}>
        {users ? (
          users.map((user) => (
            <UsersListButton
              key={user.id_user}
              sx={{
                color: "#000",
                border: "1px solid #c2c2c2",
                borderRadius: "10px",
              }}
              onClick={() => navigate(`/usuarios/editar/${user.id_user}`)}
            >
              {user.name}
              <p>{user.role === 1 ? "administrador" : "padrão"}</p>
            </UsersListButton>
          ))
        ) : (
          <Loading />
        )}
        <AddRegisterButton>
          <PersonAddIcon sx={{ fontSize: "1em", color: "green" }} />
          <p onClick={() => navigate("/usuarios/cadastro")}>
            cadastrar novo usuário
          </p>
        </AddRegisterButton>
      </DefaultFormContainer>
    </>
  );
}

export default Users;
