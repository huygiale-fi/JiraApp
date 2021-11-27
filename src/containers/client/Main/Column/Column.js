import React from "react";
import {  Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import './Column.scss'
import Task from "../Task/Task";
const Container = styled.div`
  margin: 8px;
  
  border-radius: 2px;
  width: 25%;
  display: flex;
  flex-direction: column;
`;
const TitleArea = styled.div`
  padding: 8px;
  display:flex;
  align-items:center;
`;
const NameTitle = styled.h3`
background:rgb(253, 236, 200);
padding:3px 6px;
font-size: 12.5px;
font-weight:300;
  color: rgb(94, 108, 132);
border-radius:4px;
`
const Count = styled.span`
  margin-left:10px;

`
const TaskList = styled.div`
  padding: 10px;
  transition: background-color 0.2s ease;
  
  min-height: 100px;
`;



export default function Column(props) {
  let backLog = ''
  let done = ''
  let selected=''
  if(props.column.statusName.toLowerCase() === 'backlog'){
    backLog = 'backLog'
  }
  if(props.column.statusName.toLowerCase() === 'done'){
    done = 'completed'
  }
  if(props.column.statusName.toLowerCase() === 'selected for development'){
    selected = 'selected'
  }
  return (
        <Container>
          <TitleArea><NameTitle className={`${backLog} ${done} ${selected}`}>{props.column.statusName}</NameTitle>  <Count>{props.column.lstTaskDeTail.length}</Count> </TitleArea>
          <Droppable droppableId={props.column.statusId} >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.column.lstTaskDeTail.map((task, index) => {
                  return <Task key={index} task={task} index={index} />;
                })}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
        )
}
