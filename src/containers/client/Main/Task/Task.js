
import React, { Fragment } from 'react'
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import TextsmsIcon from '@mui/icons-material/Textsms';
import './Task.scss'
import {useDispatch,useSelector} from 'react-redux'
import UpdateTask from './UpdateTask/UpdateTask';
import { fetchDetailTaskAction } from 'store/action/taskAction';
const Container = styled.div`
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color:#fff;
  border:1px solid #f3f3f3;
  box-shadow:rgb(9 30 66 / 25%) 0px 1px 2px 0px;
  &:hover{
    background: rgba(55, 53, 47, 0.08);
  }
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const AreaImage = styled.div`
  margin-top:3px;
  display:flex;
`
const ImageUser = styled.img`
  height:24px;
  width:24px;
  border-radius:50%;
`

const AreaPriority = styled.div`
  display:flex;
  margin-top:5px;
  justify-content:space-between;
`
const Priority = styled.div`
  padding:2px;
  border-radius:4px;
  font-size:12px;
`
const TypeTask=styled.div`
padding:2px;
  border-radius:4px;
  font-size:12px;
`
const AreaComment = styled.div`
  display:flex;
  align-items:center;
  margin-top:8px;
  font-size:14px;
  color:rgba(55, 53, 47, 0.4);
`
const CommentIcon = styled(TextsmsIcon)`
  color:rgba(55, 53, 47, 0.4);
  height:20px;
  width:20px;
  margin-right:5px;
`
export default function Task(props) {
  const [openNewTask, setopenNewTask] = React.useState(false);
  const [TaskId, setTaskId] = React.useState();
  const {detailTask}  = useSelector(state => state.taskReducer)
  

  const dispatch = useDispatch()
    let bug = ''
    let newTask = ''
    let High = ''
    let Medium = ''
    let Low = ''
    let Lowest = ''
    if(props.task.priorityTask.priorityId === 1){
      High='High'
    }
    if(props.task.priorityTask.priorityId === 2){
      Medium='Medium'
    }
    if(props.task.priorityTask.priorityId === 3){
      Low='Low'
    }
    if(props.task.priorityTask.priorityId === 4){
      Lowest='Lowest'
    }
    if(props.task.taskTypeDetail.id === 1){
      bug='bug'
    }
    if(props.task.taskTypeDetail.id===2){
      newTask='newTask'
    }
    const handleUpdateTask =(taskId)=>{
      
      dispatch(fetchDetailTaskAction(props.task.taskId))
      setopenNewTask(true)
      setTaskId(taskId)
    }
    const handleCloseNewTask = () => setopenNewTask(false);

    return (
      <Fragment>
        <Draggable draggableId={props.task.taskId.toString()} index={props.index}>
        {(provided,snapshot) => (
          <Container onClick={()=>handleUpdateTask(props.task.taskId)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {props.task.taskName}
            <AreaImage>
            {props.task.assigness?.map(userAssign=>{
            
              return <div key={userAssign.id} style={{marginRight:"10px",fontSize:"14px",display:"flex",alignItems:"center"}}>
                  <ImageUser src={userAssign.avatar}/><span style={{marginLeft:"4px"}}>{userAssign.name}</span>
              </div>
              
              })}
            </AreaImage>
            <AreaPriority>
            <Priority className={`${High} ${Medium} ${Low} ${Lowest}`} >{props.task.priorityTask.priority}</Priority>
            <TypeTask className={`${bug} ${newTask}`}>{props.task.taskTypeDetail.taskType}</TypeTask>
            </AreaPriority>
            <AreaComment>
            {detailTask?.lstComment?.length > 0 ? (<CommentIcon> </CommentIcon>) : null}
            </AreaComment>
          </Container>
        )}
      </Draggable>
      <UpdateTask TaskId={TaskId} openNewTask={openNewTask} handleCloseNewTask={handleCloseNewTask}/>
      </Fragment>
    )
}
