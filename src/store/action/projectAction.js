import projectApi from "apis/projectApi";
import * as projectType from 'store/constants/projectType'

export const createProjectAction = formData => async(dispatch)=>{
    try{
        dispatch({type:projectType.CREATE_PROJECT_REQUEST})
        const response = await projectApi.postCreateProjectApi(formData)
        console.log(response);
        dispatch({
            type:projectType.CREATE_PROJECT_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        console.log(err);
        dispatch({
            type:projectType.CREATE_PROJECT_FAILED,
            payload:err
        })
    }
}
export const updateProjectAction = (formData,id) => async(dispatch)=>{
    try{
        dispatch({type:projectType.UPDATE_PROJECT_REQUEST})
        const response = await projectApi.postUpdateProjectApi(formData,id)
        console.log(response);
        dispatch({
            type:projectType.UPDATE_PROJECT_SUCCESS,
            payload:response.data.content
        })
        dispatch(fetchAllProjectAction())
        dispatch(fetchProjectDetailAction(id))
    }catch(err){
        console.log(err);
        dispatch({
            type:projectType.UPDATE_PROJECT_FAILED,
            payload:err
        })
    }
}

export const fetchAllProjectAction = () => async(dispatch)=>{
    try{
        dispatch({type:projectType.FETCH_ALL_PROJECT_REQUEST})
        const response = await projectApi.fetchAllProjectApi()
        console.log(response);
        dispatch({
            type:projectType.FETCH_ALL_PROJECT_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        console.log(err);
        dispatch({
            type:projectType.FETCH_ALL_PROJECT_FAILED,
            payload:err
        })
    }
}


export const fetchProjectDetailAction = (id) => async(dispatch)=>{
    try{
        dispatch({type:projectType.FETCH_DETAIL_PROJECT_REQUEST})
        const response = await projectApi.fetchProjectDetailApi(id)
        console.log(response);
        dispatch({
            type:projectType.FETCH_DETAIL_PROJECT_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        console.log(err);
        dispatch({
            type:projectType.FETCH_DETAIL_PROJECT_FAILED,
            payload:err
        })
    }
}

export const assignUserProjectAction = (formData) => async(dispatch)=>{
    try{
        dispatch({type:projectType.ASSIGN_USER_PROJECT_REQUEST})
        const response = await projectApi.assignUserProjectApi(formData)
        console.log(response);
        dispatch({
            type:projectType.ASSIGN_USER_PROJECT_SUCCESS,
            payload:response.data.content
        })
    }catch(err){
        console.log(err);
        dispatch({
            type:projectType.ASSIGN_USER_PROJECT_FAILED,
            payload:err
        })
    }
}