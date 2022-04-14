export const listNominees = () => {
    return {
        type: "GET_NOMINEES"
    }
}

export const addUser = (user) =>{
    return{
        type:"ADD_USER",
        payload:user
    }
}

export const updateVote = (vote) => {    
    return {
        type: "UPDATE_VOTE",
        payload : vote 
    }
}