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
    console.log("vote in saga",vote)  
    return {
        type: "UPDATE_VOTE",
        payload : vote 
    }
}
