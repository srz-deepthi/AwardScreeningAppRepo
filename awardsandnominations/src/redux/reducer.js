const initialState = {
    awardslist : [],
    user:[]
}

const Reducer = (state = initialState, action) => {
    if(action.type === 'GET_NOMINEES_INFO'){
        return{
            ...state,
            awardslist : action.getInfo,
            type : action.type
        }
    }

    if(action.type === 'ADD_USER_INFO'){
        return{
            ...state,
            user:[...state.user, action.postInfo],
            type : action.type
        } 
    }
    return state
}

export default Reducer