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
import { CreateAndEditUsersContainer } from "./styles/createAndEditUsers";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { iconFontSize } from "../../styles/Variables";
import { useState } from "react";

function RegisterOrUpdateUser() {
  const inputs = [
    {
      input: "nome",
      type: "text",
      shrink: true,
      icon: <BadgeIcon sx={{ fontSize: `${iconFontSize}` }} />,
    },
    {
      input: "telefone",
      type: "text",
      shrink: true,
      icon: <PhoneIphoneIcon sx={{ fontSize: `${iconFontSize}` }} />,
    },
    {
      input: "email",
      type: "email",
      shrink: true,
      icon: <EmailIcon sx={{ fontSize: `${iconFontSize}` }} />,
    },
    {
      input: "senha",
      type: "password",
      shrink: true,
      icon: <KeyIcon sx={{ fontSize: `${iconFontSize}` }} />,
    },
  ];

  const [age, setAge] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <h1>cadastro usuário</h1>
      <CreateAndEditUsersContainer>
        <FormControl sx={{ width: "56%" }}>
          <InputLabel id="demo-simple-select-label">tipo de usuário</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="tipo de usuário"
            onChange={handleChange}
          >
            {["ADMINSITRADOR", "PADRÃO"].map((item) => (
              <MenuItem value={item === "padrão" ? 2 : 1}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {inputs &&
          inputs.map((item) => (
            <TextField
              required
              key={item.input}
              type={item.type}
              label={item.input}
              InputLabelProps={{ shrink: item.shrink }}
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
          ))}
        <Button variant="contained" sx={{ height: "3em" }}>
          Cadastrar
        </Button>
      </CreateAndEditUsersContainer>
    </>
  );
}

export default RegisterOrUpdateUser;
