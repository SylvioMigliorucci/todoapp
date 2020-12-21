import styled from "styled-components";


export const Container = styled.div`
  
`;

export const Tasks = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  flex-direction: column;

`;

export const TaskCheckItem = styled.div`
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  `;

export const Tooltip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
  &hover {
    visibility: visible;
    opacity: 1;
  }
`;