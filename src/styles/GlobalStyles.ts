import { createTheme } from "@mui/material";
import styled, { createGlobalStyle } from "styled-components";
import { bgPrimaryColor, h1FontSize } from "./Variables";

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
