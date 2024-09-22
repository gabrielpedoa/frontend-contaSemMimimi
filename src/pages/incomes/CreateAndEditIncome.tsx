import HeaderComponent from "../../components/HeaderComponent";
import { DefaultFormContainer } from "../../styles/GlobalStyles";
import DescriptionIcon from "@mui/icons-material/Description";
import BadgeIcon from "@mui/icons-material/Badge";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { iconFontSize } from "../../styles/Variables";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SubmitButton from "../../components/ButtonSubmit";
import { useRef, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import { IIncomeCategory } from "../../@types/incomeCategory";
import { useRequest } from "../../hooks/useRequest";
import { useAuthHook } from "../../context/AuthContext";
import { IResponseModalState } from "../../@types/components/ResponseModal";
import Loading from "../../components/Loading";
import ResponseModal from "../../components/ResponseModal";

function CreateAndEditIncome() {
  const [incomeCategoryId, setIncomeCategoryId] = useState<number | string>("");
  const [incomeType, setIncomeType] = useState<string | null>(null);
  const [responseModal, setResponseModal] = useState<IResponseModalState>({
    open: false,
    message: "",
    icon: undefined,
  });

  const { token, user } = useAuthHook();

  const { data: incomeCategories } = useFetching<IIncomeCategory[]>({
    url: "/income-category/list",
  });

  const { makeRequest, loading } = useRequest({
    token: token!,
    onSuccess: (response) => {
      setResponseModal({
        open: true,
        message: `sucesso!`,
        icon: (
          <SentimentVerySatisfiedIcon
            sx={{ fontSize: `${iconFontSize}*4`, color: "blue" }}
          />
        ),
      });
    },
    onError: (error) => {
      setResponseModal({
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

  const nameRef = useRef<HTMLInputElement>();
  const valueRef = useRef<HTMLInputElement>();
  const obsRef = useRef<HTMLInputElement>();
  const entryDateRef = useRef<HTMLInputElement>();

  const inputs = [
    {
      name: "nome entrada",
      type: "text",
      placeHolder: "nome da entrada",
      icon: <BadgeIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: nameRef,
    },
    {
      name: "valor",
      type: "number",
      placeHolder: "valor",
      icon: <CurrencyExchangeIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: valueRef,
    },
    {
      name: "descriçao",
      type: "text",
      placeHolder: "descrição entrada",
      icon: <DescriptionIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: obsRef,
    },
    {
      name: "dia recebimento",
      type: "date",
      placeHolder: "dia recebimento",
      icon: <DateRangeIcon sx={{ fontSize: `${iconFontSize}` }} />,
      inputRef: entryDateRef,
    },
  ];

  function getRefValues() {
    const name = nameRef.current?.value;
    const value = valueRef.current?.value;
    const obs = obsRef.current?.value;
    const entryDate = entryDateRef.current?.value;

    return {
      id_user: user?.id_user,
      name: name!,
      amount: Number(value!),
      obs: obs!,
      entry_date: getDayOfDateInput(entryDate!),
      type: incomeType,
      id_category: Number(incomeCategoryId),
    };
  }

  function handleCategoryChange(e: SelectChangeEvent) {
    setIncomeCategoryId(e.target.value);
  }

  function handleTypeIncomeChange(e: SelectChangeEvent) {
    setIncomeType(e.target.value);
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = getRefValues();
    console.log(data);
    await makeRequest(`/income/create`, "create", data);
  }

  function getDayOfDateInput(value: string) {
    const date = value.split("-")[2];
    return Number(date);
  }

  function handleClose() {
    setResponseModal({
      open: false,
      message: "",
      icon: undefined,
    });
  }

  return (
    <>
      <HeaderComponent route="/entradas" title="cadastro de entrada" />
      <DefaultFormContainer width={80}>
        {inputs.map((input) => (
          <TextField
            sx={{ width: "100%", maxWidth: "212px" }}
            type={input.type}
            key={input.name}
            placeholder={input.placeHolder}
            label={input.name}
            inputRef={input.inputRef}
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
        <FormControl sx={{ width: "100%", maxWidth: "212px" }}>
          <InputLabel>categorias</InputLabel>
          <Select
            value={String(incomeCategoryId)}
            onChange={handleCategoryChange}
          >
            {incomeCategories
              ? incomeCategories.map((e) => (
                  <MenuItem key={e.id_category} value={e.id_category}>
                    {e.name}
                  </MenuItem>
                ))
              : []}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%", maxWidth: "212px" }}>
          <InputLabel>tipo de entrada</InputLabel>
          <Select value={incomeType!} onChange={handleTypeIncomeChange}>
            <MenuItem value="permanent">RECORRENTE</MenuItem>
            <MenuItem value="occasionally">PONTUALMENTE</MenuItem>
          </Select>
        </FormControl>
        {loading ? (
          <Loading />
        ) : (
          <SubmitButton onClick={handleSubmit} description="cadastrar" />
        )}
        {responseModal && (
          <ResponseModal
            icon={responseModal.icon}
            message={responseModal.message}
            open={responseModal.open}
            route="/entradas"
            onClose={handleClose}
          />
        )}
      </DefaultFormContainer>
    </>
  );
}
export default CreateAndEditIncome;
