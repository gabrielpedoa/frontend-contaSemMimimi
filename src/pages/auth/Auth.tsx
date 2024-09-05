import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";
import image from "../../assets/logo.png";
import Loading from "../../components/Loading";
import { useAuthHook } from "../../context/AuthContext";
import { AuthContainer, ButtonContainer } from "./styles";

const Auth = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const inputs = [
    {
      name: "username",
      type: "email",
      placeHolder: "type your username",
      icon: <PersonIcon />,
      inputRef: emailRef,
    },
    {
      name: "password",
      type: "password",
      placeHolder: "type your password",
      icon: <KeyIcon />,
      inputRef: passwordRef,
    },
  ];

  const { authService, loading, error } = useAuthHook();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRef.current && !passwordRef.current) return;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (email.length === 0 || password.length === 0) {
      alert("Invalid Credentials!");
      return;
    }
    await authService(email, password);
  }
  return (
    <AuthContainer>
      <img src={image} alt="logo image" />
      {inputs.map((e) => (
        <TextField
          key={e.name}
          type={e.type}
          label={e.name}
          placeholder={e.placeHolder}
          inputRef={e.inputRef}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">{e.icon}</InputAdornment>
              ),
            },
          }}
        />
      ))}
      <ButtonContainer>
        {loading ? (
          <Loading />
        ) : (
          <Button
            onClick={handleLogin}
            variant="contained"
            sx={{ height: "3.5em", background: "#719e27", width: "30%" }}
          >
            Login
          </Button>
        )}
      </ButtonContainer>
    </AuthContainer>
  );
};

export default Auth;
