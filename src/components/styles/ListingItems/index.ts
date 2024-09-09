import styled from "styled-components";

export const ListContainer = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "100%")};
  border: 1px solid #c2c2c2;
  overflow-x: auto;
  height: auto;
  overflow-y: none;
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

export const FieldsItems = styled.li<{ width: string; isShow?: boolean }>`
  max-width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  border: 1px solid #c2c2c2;
  padding: 0.8em 0.5em;
  font-weight: 400;
  font-size: 1em;
  overflow: auto;
  text-align: center;

  p {
    overflow: hidden;
    max-height: 4em;
  }

  @media screen and (max-width: 1000px) {
    max-width: 10em;
    min-width: 10em;
    font-size: 0.8em;
  }
`;
