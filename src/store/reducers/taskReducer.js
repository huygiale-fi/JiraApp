import * as taskType from 'store/constants/taskType'

const initialState = {
    detaiTask:{}
}

const taskReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case taskType.FETCH_DETAIL_TASK_REQUEST:
        return { ...state }
    case taskType.FETCH_DETAIL_TASK_SUCCESS:
        return { ...state,detailTask:payload }
    case taskType.FETCH_DETAIL_TASK_FAILED:
        return { ...state }
    default:
        return state
    }
}

export default taskReducer;
