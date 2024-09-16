import { createTheme } from "@mui/material";
import styled, { createGlobalStyle } from "styled-components";
import { bgPrimaryColor, h1FontSize, pFontSize } from "./Variables";

export const THEME = createTheme({
  typography: {
    fontFamily: `'Inconsolata', monospace;`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export const GlobalStyle = createGlobalStyle`
     * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inconsolata', monospace;
    }

    li {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: #000;
    }

    body {
      background-color: ${bgPrimaryColor};
    }
`;

export const MainContainer = styled.main`
  width: 100%;
  display: flex;

  .content {
    max-height: 100vh;
    width: 100%;
    text-transform: uppercase;

    h1 {
      text-align: center;
      margin-top: 1em;
    }

    @media screen and (max-width: 768px) {
      h1 {
        font-size: ${h1FontSize};
      }

      label {
        font-size: 0.7em;
      }
    }
  }
`;

export const AddRegisterButton = styled.div`
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

export const DefaultFormContainer = styled.div<{ width: number }>`
  width: 100%;
  min-height: ${({ width }) => width}vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;
