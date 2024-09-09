import { createTheme } from "@mui/material";
import styled, { createGlobalStyle } from "styled-components";

export const THEME = createTheme({
  typography: {
   "fontFamily": `'Inconsolata', monospace;`,
   "fontSize": 14,
   "fontWeightLight": 300,
   "fontWeightRegular": 400,
   "fontWeightMedium": 500
  }
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
`;

export const MainContainer = styled.main`
  width: 100%;
  display: flex;

  .content {
    max-height: 100vh;
    width: 100%;
    text-transform: uppercase;
  }
`;
