import callApi from 'utils/callApi'
const authApi={
    signUpApi(formData){
        return callApi(`Users/signup`,'POST',formData)
    },
    signInApi(formData){
        return callApi(`Users/signin`,"POST",formData)
    },
    getProject(formdata){
        return callApi(``,"DELETE",formdata)
    },
    createProject(formdata){
        return callApi(`Project/createProjectAuthorize`,"POST",formdata, )
    }
}
export default authApi;