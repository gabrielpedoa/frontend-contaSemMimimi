import styled from "styled-components";

export const UsersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  h1 {
    text-align: center;
    margin-top: 0.5em;
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 1.2em;
    }
  }
`;

export const AddUserButton = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: .3em;
  
  @media screen and (max-width: 768px) {
    p {
      font-size: .6em;
    }
  }
`;
