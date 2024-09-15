import { useNavigate } from "react-router-dom";
import { IncomeContainer } from "./styles";
import { AddRegisterButton } from "../../styles/GlobalStyles";
import AddIcon from "@mui/icons-material/Add";
import HeaderComponent from "../../components/HeaderComponent";

const Incomes = () => {
  const navigate = useNavigate();
  return (
    <IncomeContainer>
      <HeaderComponent title={"entradas"} route={"/dashboard"} />
      <AddRegisterButton>
        <AddIcon sx={{ fontSize: "1em", color: "green" }} />
        <p onClick={() => navigate("/entradas/categoria")}>
          categoria de entradas
        </p>
      </AddRegisterButton>
      <AddRegisterButton>
        <AddIcon sx={{ fontSize: "1em", color: "green" }} />
        <p onClick={() => navigate("/entrada/cadastro")}>nova entrada</p>
      </AddRegisterButton>
    </IncomeContainer>
  );
};

export default Incomes;
