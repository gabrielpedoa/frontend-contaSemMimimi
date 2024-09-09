import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IResponseModalState } from "../../@types/components/ResponseModal";
import { IUser } from "../../@types/user";
import Loading from "../../components/Loading";
import ResponseModal from "../../components/ResponseModal";
import { useAuthHook } from "../../context/AuthContext";
import { useFetching } from "../../hooks/useFetching";
import {
  createUserService,
  deleteUserService,
  updateUserService,
} from "../../services/users";
import { iconFontSize } from "../../styles/Variables";
import {
  CreateAndEditUsersContainer,
  EditButtonSettings,
} from "./styles/createAndEditUsers";

export interface ErrorMessage {
  errorMessage?: string;
}

function RegisterOrUpdateUser() {
  const nameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [type, setType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseUserModal, setResponseUserModal] =
    useState<IResponseModalState>({
      open: false,
      message: "",
      icon: undefined,
    });

  const { id_user } = useParams();

  const { token } = useAuthHook();

  const { data: user } = useFetching<IUser>({
    url: `users/get/${id_user}`,
  });

  const userInputs = [
    {
      input: "nome",
      type: "text",
      shrink: true,
      icon: <BadgeIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: nameRef,
      fetchedData: user?.name,
      show: true,
    },
    {
      input: "telefone",
      type: "text",
      shrink: true,
      icon: <PhoneIphoneIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: phoneRef,
      fetchedData: user?.phone,
      show: true,
    },
    {
      input: "email",
      type: "email",
      shrink: true,
      icon: <EmailIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: emailRef,
      fetchedData: user?.email,
      show: true,
    },
    {
      input: "senha",
      type: "password",
      shrink: true,
      icon: <KeyIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: passwordRef,
      fetchedData: user?.password,
      show: id_user ? false : true,
    },
  ];

  const handleUserTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  function getRefInputs() {
    const name = nameRef.current?.value;
    const phone = phoneRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    return {
      name: name!,
      phone: phone!,
      email: email!,
      password: password!,
      role: Number(type!),
    };
  }

  function handleClose() {
    setResponseUserModal({
      open: false,
      message: "",
      icon: undefined,
    });
  }

  async function handleCreate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = getRefInputs();
    try {
      setLoading(() => true);
      await createUserService(data);
      setResponseUserModal({
        open: true,
        message: "Usuário cadastrado com sucesso",
        icon: (
          <SentimentVerySatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "blue" }}
          />
        ),
      });
    } catch (error) {
      const { response } = error as AxiosError<string>;
      const err = (response?.data as ErrorMessage)?.errorMessage;
      console.log(err);
      setResponseUserModal({
        open: true,
        message: String(err!),
        icon: (
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "red" }}
          />
        ),
      });
    } finally {
      setLoading(() => false);
    }
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setLoading(() => true);
      await deleteUserService(id_user!, token!);
      setResponseUserModal({
        open: true,
        message: "Usuário deletado com sucesso",
        icon: (
          <SentimentVerySatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "blue" }}
          />
        ),
      });
    } catch (error) {
      const { response } = error as AxiosError<string>;
      const err = (response?.data as ErrorMessage)?.errorMessage;
      setResponseUserModal({
        open: true,
        message: String(err!),
        icon: (
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "red" }}
          />
        ),
      });
    } finally {
      setLoading(() => false);
    }
  }

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setLoading(() => true);
      await updateUserService(user!, token!);
      setResponseUserModal({
        open: true,
        message: "Usuário atualizado com sucesso",
        icon: (
          <SentimentVerySatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "blue" }}
          />
        ),
      });
    } catch (error) {
      const { response } = error as AxiosError<string>;
      const err = (response?.data as ErrorMessage)?.errorMessage;
      setResponseUserModal({
        open: true,
        message: String(err!),
        icon: (
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "red" }}
          />
        ),
      });
    } finally {
      setLoading(() => false);
    }
  }

  return (
    <>
      <h1>{id_user ? "editar usuário" : "cadastro usuário"}</h1>
      <CreateAndEditUsersContainer>
        <FormControl sx={{ width: "100%", maxWidth: "212px" }}>
          <InputLabel>tipo de usuário</InputLabel>
          <Select
            required
            value={String(user?.role) ?? type}
            label="tipo de usuário"
            onChange={handleUserTypeChange}
          >
            {[
              { name: "ADMINISTRADOR", value: 1 },
              { name: "PADRÃO", value: 2 },
            ].map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {userInputs &&
          userInputs.map(
            (item) =>
              item.show && (
                <TextField
                  required
                  key={item.input}
                  type={item.type}
                  label={item.input}
                  InputLabelProps={{ shrink: item.shrink }}
                  inputRef={item.ref}
                  value={item.fetchedData}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ fontSize: `${iconFontSize}` }}
                        >
                          {item.icon}
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )
          )}
        {loading ? (
          <Loading />
        ) : (
          <EditButtonSettings>
            <Button
              variant="contained"
              sx={{ height: "3em" }}
              onClick={id_user ? handleCreate : handleUpdate}
            >
              {id_user ? "editar" : "cadastrar"}
            </Button>
            {id_user && (
              <Button
                variant="contained"
                sx={{ height: "3em", background: "red" }}
                onClick={handleDelete}
              >
                Excluir
              </Button>
            )}
          </EditButtonSettings>
        )}

        {responseUserModal && (
          <ResponseModal
            icon={responseUserModal.icon}
            message={responseUserModal.message}
            open={responseUserModal.open}
            route="/usuarios"
            onClose={handleClose}
          />
        )}
      </CreateAndEditUsersContainer>
    </>
  );
}

export default RegisterOrUpdateUser;
