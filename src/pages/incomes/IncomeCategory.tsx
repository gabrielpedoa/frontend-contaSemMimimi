import DescriptionIcon from "@mui/icons-material/Description";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { InputAdornment, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { IResponseModalState } from "../../@types/components/ResponseModal";
import { IIncomeCategory } from "../../@types/incomeCategory";
import SubmitButton from "../../components/ButtonSubmit";
import HeaderComponent from "../../components/HeaderComponent";
import Loading from "../../components/Loading";
import ResponseModal from "../../components/ResponseModal";
import { useAuthHook } from "../../context/AuthContext";
import { useRequest } from "../../hooks/useRequest";
import { DefaultFormContainer } from "../../styles/GlobalStyles";
import { iconFontSize } from "../../styles/Variables";

function IncomeCategory() {
  const { token } = useAuthHook();
  const [responseUserModal, setResponseUserModal] =
    useState<IResponseModalState>({
      open: false,
      message: "",
      icon: undefined,
    });

  const nameRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

  const inputs = [
    {
      name: "nome",
      type: "text",
      placeHolder: "nome categoria",
      icon: <LocalAtmIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: nameRef,
      textarea: false,
    },
    {
      name: "descriçao",
      type: "text",
      placeHolder: "descrição categoria",
      icon: <DescriptionIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: descriptionRef,
      textarea: true,
    },
  ];

  function getInputRef() {
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    return { name: name!, description: description! };
  }

  const { makeRequest, loading } = useRequest({
    token: token!,
    onSuccess: (response: IIncomeCategory) => {
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

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = getInputRef();
    await makeRequest("/income-category/create", "create", data);
  }

  function handleClose() {
    setResponseUserModal({
      open: false,
      message: "",
      icon: undefined,
    });
  }

  return (
    <>
      <HeaderComponent title={"categoria de entradas"} route={"/entradas"} />
      <DefaultFormContainer width={65}>
        {inputs.map((input) => (
          <TextField
            sx={{ maxWidth: "211.95px" }}
            key={input.name}
            type={input.type}
            placeholder={input.placeHolder}
            inputRef={input.inputRef}
            multiline={input.textarea}
            rows={input.textarea ? 3 : undefined}
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
        {loading ? (
          <Loading />
        ) : (
          <SubmitButton onClick={handleSubmit} description="cadastrar" />
        )}
        {responseUserModal && (
          <ResponseModal
            icon={responseUserModal.icon}
            message={responseUserModal.message}
            open={responseUserModal.open}
            route="/entradas"
            onClose={handleClose}
          />
        )}
      </DefaultFormContainer>
    </>
  );
}
export default IncomeCategory;
