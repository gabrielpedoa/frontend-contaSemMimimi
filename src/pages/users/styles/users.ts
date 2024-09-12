import { Button } from "@mui/material";
import styled from "styled-components";
import { bgGradient, pFontSize } from "../../../styles/Variables";

export const UsersContainer = styled.div`
  width: 100%;
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

export const UsersListButton = styled(Button)`
  width: 40%;
  font-weight: 600;
  background: ${bgGradient};
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    p {
      font-size: ${pFontSize};
    }
  }
`;
