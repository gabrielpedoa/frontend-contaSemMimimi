import { useNavigate } from "react-router-dom";
import { IncomeContainer } from "./styles";
import { AddRegisterButton } from "../../styles/GlobalStyles";
import AddIcon from "@mui/icons-material/Add";

const Incomes = () => {
  const navigate = useNavigate();
  return (
    <IncomeContainer>
      <h1>Entradas</h1>
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
