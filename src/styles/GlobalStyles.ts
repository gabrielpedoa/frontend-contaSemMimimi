import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
     * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
    overflow-y: scroll;
  }
`;
