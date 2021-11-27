
import taskApi from 'apis/taskApi';
import * as taskType from 'store/constants/taskType'
import { fetchProjectDetailAction } from './projectAction';

export const CreateTaskAction = (formData) => async(dispatch)=>{
    try{
        dispatch({type:taskType.CREATE_TASK_REQUEST})
        const response = await taskApi.createTask(formData)
        dispatch({
            type:taskType.CREATE_TASK_SUCCESS,
            payload:response.data.content
        })
        dispatch(fetchProjectDetailAction(formData.projectId))
    }catch(err){
        dispatch({
            type:taskType.CREATE_TASK_FAILED,
            payload:err
        })
    }
}

export const fetchDetailTaskAction = (id) => async(dispatch)=>{
    try{
        dispatch({type:taskType.FETCH_DETAIL_TASK_REQUEST})
        const response = await taskApi.fetchDetailTask(id)
        dispatch({
            type:taskType.FETCH_DETAIL_TASK_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:taskType.FETCH_DETAIL_TASK_FAILED,
            payload:err
        })
    }
}

export const updateTaskAction = (formdata) => async(dispatch)=>{
    try{
        dispatch({type:taskType.FETCH_DETAIL_TASK_REQUEST})
        const response = await taskApi.updateTask(formdata)
        console.log("update task",response.data.content);
        dispatch({
            type:taskType.FETCH_DETAIL_TASK_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:taskType.FETCH_DETAIL_TASK_FAILED,
            payload:err
        })
    }
}