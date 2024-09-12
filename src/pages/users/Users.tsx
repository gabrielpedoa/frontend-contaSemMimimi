import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../@types/user";
import Loading from "../../components/Loading";
import { useFetching } from "../../hooks/useFetching";
import { AddRegisterButton } from "../../styles/GlobalStyles";
import { UsersContainer, UsersListButton } from "./styles/users";

function Users() {
  const { data: users } = useFetching<IUser[]>({
    url: "/users/list",
  });

  const navigate = useNavigate();
  return (
    <>
      <h1>usuários</h1>
      <UsersContainer>
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
      </UsersContainer>
    </>
  );
}

export default Users;
