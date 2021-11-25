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