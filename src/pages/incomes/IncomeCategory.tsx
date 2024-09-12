import DescriptionIcon from "@mui/icons-material/Description";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";
import SubmitButton from "../../components/ButtonSubmit";
import { iconFontSize } from "../../styles/Variables";
import { DefaultFormContainer } from "../../styles/GlobalStyles";

function IncomeCategory() {
  const nameRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const inputs = [
    {
      name: "nome",
      type: "text",
      placeHolder: "nome categoria",
      icon: <LocalAtmIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: nameRef,
    },
    {
      name: "descriçao",
      type: "text",
      placeHolder: "descrição categoria",
      icon: <DescriptionIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: descriptionRef,
      rows: 5
    },
  ];

  function getInputRef() {
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    return { name, description };
  }

  async function handleSubmit() {
    const data = getInputRef();
    console.log("data: ", data);
  }

  return (
    <>
      <h1>categoria de entradas</h1>
      <DefaultFormContainer>
        {inputs.map((input) => (
          <TextField
            key={input.name}
            type={input.type}
            placeholder={input.placeHolder}
            rows={input.rows ? input.rows : ""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ fontSize: `${iconFontSize}` }}
                  >
                    {input.icon}
                  </InputAdornment>
                ),
              },
            }}
          />
        ))}
        <SubmitButton onClick={handleSubmit} description="cadastrar" />
      </DefaultFormContainer>
    </>
  );
}
export default IncomeCategory;
