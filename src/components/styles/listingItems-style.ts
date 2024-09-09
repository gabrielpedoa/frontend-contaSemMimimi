import styled from "styled-components";

export const ListContainer = styled.div<{ w?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.w ? props.w : "95%")};
  border: 2px solid #c2c2c2;
  overflow-x: auto;
  height: auto;
  overflow-y: none;
  border-radius: 2%;

`;

export const Items = styled.ul`
  display: flex;
  width: 100%;
  li {
    border-right: none;
    border-left: none;
    border-top: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const FieldsItems = styled.li<{ w: string; isShow?: boolean }>`
  max-width: ${(props) => props.w};
  min-width: ${(props) => props.w};
  border: 2px solid #c2c2c2;
  padding: 0.8em 0.5em;
  font-weight: 600;
  font-size: 1em;
  overflow: auto;
  text-align: center;

  p {
    overflow: hidden;
    max-height: 4em;
  }

  @media screen and (max-width: 1000px) {
    font-size: 0.7em;
  }
`;
