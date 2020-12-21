import styled from "styled-components";


export const Container = styled.div`
  /* border: 2px solid #000; */
  padding: 10px;
  margin: 20px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;

export const ProjectItem = styled.div`
  padding: 10px;
  background-color: #fff;
  border: 2px solid #245785;
  margin: 25px;
  font-size: 1.1em;
  width: 32%;
  border-radius: 5px;

` 

export const Projects = styled.div`
  /* border: 2px solid #000; */
  /* padding: 20px; */
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-radius: 5px;
` 

export const InputForm =  styled.input`
  margin-left: 22px;
  padding: 10px;
  width: 200px;
  border: 2px solid #245785	;
  border-radius: 5px;
  font-size: 16px;
  text-decoration: double;
`

export const InputSubmit = styled.input`
  margin: 5px;
  padding: 10px;
  width: 120px;
  border: 2px solid #245785	;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  text-decoration: double;
  background-color:  #245785;
`

export const ProjectTitle = styled.div`
  margin: 10px;
  /* padding: 10px; */
  min-width: 10px;
  /* border: 2px solid #24578 5	; */
  border-radius: 5px;
  font-size: 24px;
  text-decoration: double;
  color: #245785; 
`
export const ProjectTitleLine = styled.div`
  border: 1px solid #245785;
  border-radius: 10px; 
`

