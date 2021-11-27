import callApi from 'utils/callApi'
const commentApi = {
    fetchAllComment(id){
        return callApi(`Comment/getAll?taskId=${id}`,"GET",null,null)
    },
    insertComment(formData){
        return callApi(`Comment/insertComment`,"POST",formData,localStorage.getItem('accessToken'))
    },
    deteleComment(id){
        return callApi(`Comment/deleteComment?idComment=${id}`,"DELETE",null,localStorage.getItem('accessToken'))
    }
   
}
export default commentApi