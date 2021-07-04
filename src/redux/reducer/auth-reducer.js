const initState = {
    user: null,
    snackbar: null
}

const authReducer = (state = initState, { type, payload }) => {
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
    
        default:
            return {
                ...state
            }
    }
}

export default authReducer