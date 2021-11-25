import callApi from 'utils/callApi'
const taskApi = {
    createTask(formData){
        return callApi(`Project/createTask`,"POST",formData,localStorage.getItem('accessToken'))
    },
    fetchDetailTask(taskId){
        return callApi(`Project/getTaskDetail?taskId=${taskId}`,"GET",null,localStorage.getItem('accessToken'))
    }
    
}
export default taskApi