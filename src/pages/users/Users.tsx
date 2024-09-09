import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IUser } from "../../@types/user";
import { useFetching } from "../../hooks/useFetching";
import { AddUserButton, UsersContainer, UsersListButton } from "./styles/users";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

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
              sx={{
                color: "#000",
                border: "1px solid #c2c2c2",
                borderRadius: "10px",
              }}
            >
              {user.name}
              <p>{user.role === 1 ? "administrador" : "padrão"}</p>
            </UsersListButton>
          ))
        ) : (
          <Loading />
        )}
        <AddUserButton>
          <PersonAddIcon sx={{ fontSize: "1em", color: "green" }} />
          <p onClick={() => navigate("/usuarios/cadastro")}>
            cadastrar novo usuário
          </p>
        </AddUserButton>
      </UsersContainer>
    </>
  );
}

export default Users;
