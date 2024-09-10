import styled from "styled-components";

export const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  h1 {
    flex-grow: 1;
    text-align: center;
    margin: 0;
  }

  #back-icon {
    position: absolute;
    left: 5%;
    top: 75%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
