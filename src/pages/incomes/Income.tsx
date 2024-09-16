import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import { AddRegisterButton, DefaultFormContainer } from "../../styles/GlobalStyles";

const Incomes = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderComponent title={"entradas"} route={"/dashboard"} />
      <DefaultFormContainer width={65}>
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
      </DefaultFormContainer>
    </>
  );
};

export default Incomes;
