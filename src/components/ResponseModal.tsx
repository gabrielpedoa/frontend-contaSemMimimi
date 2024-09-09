import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ResponseContent } from "./styles/responseModal-styles";
import { IResponseModalProps } from "../@types/components/ResponseModal";

export function ResponseModal({
  onClose,
  open,
  message,
  route,
  icon,
}: IResponseModalProps) {
  const navigate = useNavigate();

  function handleAction() {
    navigate(route);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <ResponseContent>
        <>{icon}</>
        <p>{message}</p>
        <Button variant="contained" onClick={handleAction}>
          Confirmar
        </Button>
      </ResponseContent>
    </Modal>
  );
}
export default ResponseModal;
