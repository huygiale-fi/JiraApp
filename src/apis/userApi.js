import callApi from 'utils/callApi'
const userApi = {
    fetchAllUser(){
        return callApi(`Users/getUser`,"GET",null,localStorage.getItem('accessToken'))
    },
    fetchUserProjectId(id){
        return callApi(`Users/getUserByProjectId?idProject=${id}`,"GET",null,localStorage.getItem('accessToken'))
    }
    
}
export default userApi