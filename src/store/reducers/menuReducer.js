const initState = {
    propositions: null,
    weekList: null,
    isWeekList: false,
    allProps: {},
    userPropositions: null,
    totalItems: null,
    totalPages: null,
    isDataLoaded: false,
    isCreatedDeleteOrEdit: false,
}

const menuReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DATA_LOADING':
            console.log('DATA_LOADING')
            return {
                ...state,
                isDataLoaded: false,
            }
        case 'WEEK_LIST':
            return{
                ...state,
                isWeekList: true,
                isDataLoaded: true,
                weekList: action.data
            }
        case 'LOAD_FROM_REQUEST':
            console.log('LOAD FROM REQUEST')
            localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify(action.propositions))
            return {
                ...state,
                isDataLoaded: true,
                isWeekList: false,
                propositions: JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`))
            }
        case 'GET_FROM_LOCALSTORAGE':
            console.log('LOAD FROM STATE')
            return {
                ...state,
                isDataLoaded: true,
                isWeekList: false,
                propositions: JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`))
            }
        case 'SENDING_REQUEST': {
            return {
                ...state,
                isCreatedDeleteOrEdit: false
            }
        }
        case 'ADD_TO_STORAGE':
            let menus = JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`));
            if (menus) {
                menus = [...menus, action.data]
                localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify(menus))

            } else {
                localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify([action.data]))
            }
            return {
                ...state,
                isCreatedDeleteOrEdit: true,
                isDataLoaded: true
            }
        case "DELETE_ITEM_FROM_STORAGE" :
            let item = JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`));

            if (item) {
                let newItem = item.filter((value) => {
                    return value.id !== action.item
                })

                localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify(newItem))
                return {
                    ...state,
                    isCreatedDeleteOrEdit: true,
                    isDataLoaded: true
                }
            }
            return {
                ...state,
                isDataLoaded: true,
            }
        case 'IS_OK' :
            return {
                ...state,
                isCreatedDeleteOrEdit: false
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
        case 'EDIT_STORAGE_ITEM':
            const items = JSON.parse(localStorage.getItem(`${action.day}-${action.weekNumber}`))
            if (items) {
                let newLocalStorage = items.filter((value) => {
                    return value.id !== action.data.id
                })

                newLocalStorage = [...newLocalStorage, action.data]
                localStorage.setItem(`${action.day}-${action.weekNumber}`, JSON.stringify(newLocalStorage))
            }

            return {
                ...state,
                isCreatedDeleteOrEdit: true,
                isDataLoaded: true,
            }
        default:
            return state
    }
}

export default menuReducer

