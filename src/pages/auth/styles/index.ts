import styled from "styled-components";

export const AuthContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  gap: 1.5em;
  background-image: url("src/assets/money.jpeg");
  background-size: cover;
  z-index: 1;
  font-size: large;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(220, 255, 220, 0.65),
      rgba(255, 253, 208, 1)
    );
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  img {
    width: 70%;
    height: auto;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
