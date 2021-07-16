const initState = {
    user: null,
    snackbar: null,
    history: null
}

const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case 'RESTORE_USER':
            return {
                ...state,
                user: payload.user
            }

        case 'LOGING':
            return {
                ...state,
                user: payload.user,
                snackbar: payload.snackbar
            }

        case 'LOG_OUT':
            return {
                ...state,
                user: null
            }

        case 'CLOSE_SNACKBAR':
            return {
                ...state,
                snackbar: null
            }

        case 'RESTORE_HISTORY':
            return {
                ...state,
                history: payload.history
            }
    
        default:
            return {
                ...state
            }
    }
}

export default userReducer