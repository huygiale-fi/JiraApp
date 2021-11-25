import callApi from 'utils/callApi'
const projectApi = {
    fetchProjectDetailApi(idProject){
        return callApi(`Project/getProjectDetail?id=${idProject}`,"GET",null,localStorage.getItem("accessToken"))
    },
    postCreateProjectApi(formdata){
        return callApi(`Project/createProjectAuthorize`,'POST',formdata,localStorage.getItem("accessToken"))
    },
    fetchAllProjectApi(){
        return callApi(`Project/getAllProject`,'GET',null,localStorage.getItem("accessToken"))
    },
    assignUserProjectApi(formData){
        return callApi(`Project/assignUserProject`,'POST',formData,localStorage.getItem("accessToken"))
    }
    
}
export default projectApi