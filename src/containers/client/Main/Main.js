import React, {  useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { fetchProjectDetailAction } from 'store/action/projectAction'
import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components'
import Column from './Column/Column'
import DescriptionProject from './DescriptionProject/DescriptionProject'
import StatusNav from './Status/Status'
import Title from './Title/Title'

const Container = styled.div`
  display:flex;
`
 
export default function Main() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {detailProject} = useSelector(state => state.projectReducer)
    useEffect(() => {
        dispatch(fetchProjectDetailAction(id))
    }, [id])

    const onDragEnd = result => {
        
    }

    return (
        <div style={{margin:" 30px"}}>
            <Title titleProject={detailProject?.projectName}/>
            <DescriptionProject desProject={detailProject?.description}/>
            <StatusNav/>
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable >
                    {provided => (
                        <Container {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {detailProject?.lstTask?.map((item, index) => {

                                return <Column key={index} column={item} index={index} />
                            })}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}