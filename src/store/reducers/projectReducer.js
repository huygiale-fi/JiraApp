import * as projectType from 'store/constants/projectType'

const initialState = {
    userProject:[]
}

const projectReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case projectType.CREATE_PROJECT_REQUEST:
        return { ...state}
    case projectType.CREATE_PROJECT_SUCCESS:
        console.log("Tạo Thành Công Project");
        return { ...state}
    case projectType.CREATE_PROJECT_FAILED:
        console.log("Tạo Thất Bại Project");
        return { ...state}
    case projectType.FETCH_ALL_PROJECT_REQUEST:
        return {...state}
    case projectType.FETCH_ALL_PROJECT_SUCCESS:
        const arrProject = payload;
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user.id);
        let arrUserProject =  arrProject.filter((project) =>  project.creator.id === user.id )
        return {...state,userProject:arrUserProject }
    case projectType.FETCH_ALL_PROJECT_FAILED:
        return {...state}
    default:
        return state
    }
}

export default projectReducer