import callApi from 'utils/callApi'
const selectBox = {
    fetchProjectCategory(){
        return callApi(`ProjectCategory`,"GET",null,null)
    },
    fetchAllPriority(){
        return callApi(`Priority/getAll`,"GET",null,null)
    },
    fetchAllTaskType(){
        return callApi(`TaskType/getAll`,"GET",null,null)
    },
    fetchAllStatus(){
        return callApi(`Status/getAll`,"GET",null,null)
    }
}
export default selectBox