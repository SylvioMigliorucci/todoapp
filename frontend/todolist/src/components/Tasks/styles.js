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
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  `;

export const Tooltip = styled.label`
  opacity: 0;
  &:hover  {
    opacity: 1;
    font-size: 12px;
    margin-left: 20px;
  }
`;

export const InputForm =  styled.input`
  margin: 10px;
  padding: 5px;
  width: 200px;
  border: 2px solid #245785	;
  border-radius: 5px;
  font-size: 14px;
  text-decoration: double;
`

export const InputSubmit = styled.input`
  margin: 5px;
  padding: 5px;
  width: 120px;
  border: 2px solid #245785	;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  text-decoration: double;
  background-color:  #245785;
`

export const TaskDescription = styled.div`
  margin: 10px;
  min-width: 10px; 
  border-radius: 5px;
  font-size: 20px;
  text-decoration: double;
  color: #245785; 

`
export const TaskDescriptionLine = styled.div`
  border: 1px solid #245785;
  border-radius: 10px; 
`