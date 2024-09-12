import { Button } from "@mui/material";
import { ButtonContainer } from "./styles/buttonSubmit";

interface ISubmitButtonProps {
  onClick: () => void;
  description: string;
}

function SubmitButton({ description, onClick }: ISubmitButtonProps) {
  return (
    <ButtonContainer>
      <Button
        onClick={onClick}
        variant="contained"
        sx={{ height: "3.5em", background: "#719e27", width: "30%" }}
      >
        {description}
      </Button>
    </ButtonContainer>
  );
}
export default SubmitButton;
