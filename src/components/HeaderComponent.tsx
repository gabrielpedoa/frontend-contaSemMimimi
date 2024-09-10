import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { HeaderTitleContainer } from "./styles/headerTitle";

interface IHeaderTitleProps {
  route: string;
  title: string;
}

function HeaderComponent({ route, title }: IHeaderTitleProps) {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate(route);
  }

  return (
    <HeaderTitleContainer>
      <ArrowBackIcon onClick={handleNavigation} id="back-icon" />
      <h1>{title}</h1>
    </HeaderTitleContainer>
  );
}
export default HeaderComponent;
