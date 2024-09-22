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
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IResponseModalState } from "../../@types/components/ResponseModal";
import { IUser } from "../../@types/user";
import HeaderComponent from "../../components/HeaderComponent";
import Loading from "../../components/Loading";
import ResponseModal from "../../components/ResponseModal";
import { useAuthHook } from "../../context/AuthContext";
import { useRequest } from "../../hooks/useRequest";
import { getUsersService } from "../../services/users";
import { DefaultFormContainer } from "../../styles/GlobalStyles";
import { iconFontSize } from "../../styles/Variables";
import { EditButtonSettings } from "./styles/createAndEditUsers";

export interface ErrorMessage {
  errorMessage?: string;
}

function RegisterOrUpdateUser() {
  const { id_user } = useParams();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (id_user) {
      (async () => {
        const response = await getUsersService(id_user, token!);
        setUser(response);
      })();
    }
  }, [id_user]);
  const { token } = useAuthHook();

  const nameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [responseUserModal, setResponseUserModal] =
    useState<IResponseModalState>({
      open: false,
      message: "",
      icon: undefined,
    });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setEmail(user.email);
      setType(String(user.role));
    }
  }, [user]);

  const userInputs = [
    {
      input: "nome",
      type: "text",
      shrink: true,
      icon: <BadgeIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: nameRef,
      fetchedData: name,
      show: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value),
      placeholder: "nome do usuário",
    },
    {
      input: "telefone",
      type: "text",
      shrink: true,
      icon: <PhoneIphoneIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: phoneRef,
      fetchedData: phone,
      show: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPhone(e.target.value),
      placeholder: "telefone do usuário",
    },
    {
      input: "email",
      type: "email",
      shrink: true,
      icon: <EmailIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: emailRef,
      fetchedData: email,
      show: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      placeholder: "email do usuário",
    },
    {
      input: "senha",
      type: "password",
      shrink: true,
      icon: <KeyIcon sx={{ fontSize: `${iconFontSize}` }} />,
      ref: passwordRef,
      show: id_user ? false : true,
      placeholder: "senha do usuário",
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

  const { makeRequest, loading } = useRequest({
    token: token!,
    onSuccess: (response: IUser) => {
      setResponseUserModal({
        open: true,
        message: `ação para ${response.name} realizada com sucesso!`,
        icon: (
          <SentimentVerySatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "blue" }}
          />
        ),
      });
    },
    onError: (error) => {
      setResponseUserModal({
        open: true,
        message: String(error),
        icon: (
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "red" }}
          />
        ),
      });
    },
  });

  async function handleCreate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = getRefInputs();
    await makeRequest("/users/create", "create", data);
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = null;
    await makeRequest(`/users/delete/${id_user}`, "delete", data);
  }

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = getRefInputs();
    await makeRequest(`users/update/${id_user}`, "update", data);
  }

  return (
    <>
      <HeaderComponent
        title={id_user ? "editar usuário" : "cadastro usuário"}
        route={"/usuarios"}
      />
      <DefaultFormContainer width={80}>
        <FormControl sx={{ width: "100%", maxWidth: "212px" }}>
          <InputLabel>tipo de usuário</InputLabel>
          <Select
            required
            value={type}
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
                  onChange={item.onChange}
                  placeholder={item.placeholder}
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
              onClick={id_user ? handleUpdate : handleCreate}
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
      </DefaultFormContainer>
    </>
  );
}

export default RegisterOrUpdateUser;
