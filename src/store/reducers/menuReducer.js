const initState = {
    propositions: {},
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_DAY_MENU':
            console.log('load menu details')
            state.propositions[`${action.day}-${action.weekNumber}`] = action.propositions

            return {
                ...state,
                propositions: state.propositions
            }
        case 'CREATE_MENU':

            if(state.propositions[`${action.day}-${action.weekNumber}`] !== undefined){
                state.propositions[`${action.day}-${action.weekNumber}`] = [...state.propositions[`${action.day}-${action.weekNumber}`], action.propositions]
            }else{
                state.propositions[`${action.day}-${action.weekNumber}`] = action.propositions
            }

            return{
                ...state,
                propositions: state.propositions
            }
        default:
            return state
    }
}

export default authReducer

