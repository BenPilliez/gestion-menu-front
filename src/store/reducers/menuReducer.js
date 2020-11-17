const initState = {
    propositions: null,
    allProps: {},
    userPropositions: null,
    totalItems: null,
    totalPages: null,
    isDataLoaded: false,
    isCreatedDeleteOrEdit: false
}

const menuReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DATA_LOADING':
            console.log('DATA_LOADING')
            return {
                ...state,
                isDataLoaded: false,
            }
        case 'LOAD_FROM_REQUEST':
            console.log('LOAD FROM REQUEST')
            localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify(action.propositions))
            return {
                ...state,
                isDataLoaded: true,
                propositions: JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`))
            }
        case 'GET_FROM_LOCALSTORAGE':
            console.log('LOAD FROM STATE')
            return {
                ...state,
                isDataLoaded: true,
                propositions: JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`))
            }
        case 'SENDING_REQUEST': {
            return {
                ...state,
                isCreatedDeleteOrEdit: false
            }
        }
        case 'ADD_MENU':
            return {
                ...state,
                isCreatedDeleteOrEdit: true
            }

        case 'ADD_TO_STORAGE':

            let menus = JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`));
            if (menus) {
                menus = [...menus, action.data]
                localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify(menus))

            } else {
                localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify(action.data))
            }
            return {
                ...state,
                isCreatedDeleteOrEdit: true,
                propositions: JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`))
            }

        case 'USER_PROPOSITIONS':
            return {
                ...state,
                isDataLoaded: true,
                userPropositions: action.userPropositions.items,
                totalItems: action.userPropositions.totalItems,
                totalPages: action.userPropositions.totalPages
            }
        case 'UPDATE_DATA_LOADING':
            return {
                ...state,
                isDataLoaded: action.value
            }
        case 'DELETE_MENU':
            return {
                ...state,
                isDataLoaded: false,
                isCreatedDeleteOrEdit: true
            }
        case 'EDIT_MENU':
            return {
                ...state,
                isCreatedDeleteOrEdit: true,
                isDataLoaded: false,
            }
        default:
            return state
    }
}

export default menuReducer

