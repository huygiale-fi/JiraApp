
import taskApi from 'apis/taskApi';
import * as taskType from 'store/constants/taskType'
import { fetchProjectDetailAction } from './projectAction';

export const CreateTaskAction = (formData) => async(dispatch)=>{
    try{
        dispatch({type:taskType.CREATE_TASK_REQUEST})
        const response = await taskApi.createTask(formData)
        console.log(response);
        dispatch({
            type:taskType.CREATE_TASK_SUCCESS,
            payload:response.data.content
        })
        dispatch(fetchProjectDetailAction(formData.projectId))
    }catch(err){
        console.log(err);
        dispatch({
            type:taskType.CREATE_TASK_FAILED,
            payload:err
        })
    }
}