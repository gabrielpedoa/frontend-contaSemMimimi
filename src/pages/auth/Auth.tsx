import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";
import image from "../../assets/logo.png";
import Loading from "../../components/Loading";
import { useAuthHook } from "../../context/AuthContext";
import { AuthContainer, ButtonContainer } from "./styles";
import { iconFontSize } from "../../styles/Variables";

const Auth = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const inputs = [
    {
      name: "username",
      type: "email",
      placeHolder: "type your username",
      icon: <PersonIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: emailRef,
    },
    {
      name: "password",
      type: "password",
      placeHolder: "type your password",
      icon: <KeyIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: passwordRef,
    },
  ];

  const { authService, loading } = useAuthHook();

  function validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRef.current && !passwordRef.current) return;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (email.length === 0 || password.length === 0)
      return alert("Invalid Credentials!");

    if (!validateEmail(email)) return alert("Please provide a valid email");

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
