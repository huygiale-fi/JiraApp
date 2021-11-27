import commentApi from 'apis/commentApi';
import * as commentType from 'store/constants/commentType'
import { fetchDetailTaskAction } from './taskAction';

export const InsertCommentAction = (formData) => async(dispatch)=>{
    try{
        dispatch({type:commentType.INSERT_COMMENT_REQUEST})
        const response = await commentApi.insertComment(formData)
        dispatch({
            type:commentType.INSERT_COMMENT_SUCCESS,
            payload:response.data.content
        })
        dispatch(fetchDetailTaskAction(formData.taskId))
    }catch(err){
        dispatch({
            type:commentType.INSERT_COMMENT_FAILED,
            payload:err
        })
    }
}


export const fetchAllCommentAction = (id) => async(dispatch)=>{
    try{
        dispatch({type:commentType.FETCH_ALL_COMMENT_REQUEST})
        const response = await commentApi.fetchAllComment(id)
        dispatch({
            type:commentType.FETCH_ALL_COMMENT_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:commentType.FETCH_ALL_COMMENT_FAILED,
            payload:err
        })
    }
}

export const deleteCommentAction = (id) => async(dispatch)=>{
    try{
        dispatch({type:commentType.DELETE_COMMENT_REQUEST})
        const response = await commentApi.deteleComment(id)
        dispatch({
            type:commentType.DELETE_COMMENT_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        dispatch({
            type:commentType.DELETE_COMMENT_FAILED,
            payload:err
        })
    }
}