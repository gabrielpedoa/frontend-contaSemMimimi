import { Button } from "@mui/material";
import styled from "styled-components";
import { bgGradient, pFontSize } from "../../../styles/Variables";

export const UsersContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

export const AddUserButton = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  margin-top: 0.5em;

  p {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: ${pFontSize};
    }
  }
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
