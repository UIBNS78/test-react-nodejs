import { urls, messages } from '../../global'
import axios from 'axios'

export const loginAction = (user, handleSetAlert, handleClose, action, navigation) => {
    return (dispatch, getState) => {
        axios.post(urls.post.login, user).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('user_token', data.token)
                    dispatch({ type: 'LOGING', payload: { user: data.user, snackbar: data.message } })
                    action.resetForm()
                    handleClose()
                    handleSetAlert(null, true)
                    if (data.user.role === 'admin') {
                        navigation.push('/list-user')
                    }
                } else {
                    handleSetAlert({ type: 'warning', message: data.message }, true)
                }
            } else {
                handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
            }
        }).catch(() => {
            handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
        })
    }
}

export const signupAction = (values, handleSetAlert, handleClose, action) => {
    return (dispatch, getState) => {
        axios.post(urls.post.signup, values).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('user_token', data.token)
                    dispatch({ type: 'LOGING', payload: { user: data.user, snackbar: data.message } })
                    action.resetForm()
                    handleClose()
                    handleSetAlert(null, true)
                } else {
                    console.log('error 1')
                    handleSetAlert({ type: 'warning', message: data.message }, true)
                }
            } else {
                console.log('error 2', status)
                handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
            }
        }).catch(() => {
            console.log('error 3')
            handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
        })
    }
}

export const updateUserAction = (user, handleSetAlert, handleClose) => {
    return (dispatch, getState) => {
        const u = {
            _id: getState().userReducer.user._id,
            ...user,
        }
        axios.post(urls.post.updateUser, u, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        }).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('user_token', data.token)
                    dispatch({ type: 'LOGING', payload: { user: data.user, snackbar: data.message } })
                    dispatch({type: 'CAR_LIST', payload: { cars: data.cars }})
                    handleClose()
                    handleSetAlert(null, true)
                } else {
                    handleSetAlert({ type: 'warning', message: data.message }, true)
                }
            } else {
                handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
            }
        }).catch(() => {
            handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
        })
    }
}

export const updateUserPasswordAction = (user, handleSetAlert, handleClose, action) => {
    return (dispatch, getState) => {
        const u = {
            _id: getState().userReducer.user._id,
            ...user,
        }
        axios.post(urls.post.updateUserPass, u, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        }).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('user_token', data.token)
                    dispatch({ type: 'LOGING', payload: { user: data.user, snackbar: data.message } })
                    action.resetForm()
                    handleClose()
                    handleSetAlert(null, true)
                } else {
                    handleSetAlert({ type: 'warning', message: data.message }, true)
                }
            } else {
                handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
            }
        }).catch(() => {
            handleSetAlert({ type: 'error', message: messages.errorRequest }, true)
        })
    }
}