import { urls, messages } from '../../global'
import axios from 'axios'

export const loginAction = (user, handleSetAlert, handleClose, action) => {
    return (dispatch, getState) => {
        axios.post(urls.post.login, user).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user))
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

export const signupAction = (values, handleSetAlert, handleClose, action) => {
    return (dispatch, getState) => {
        axios.post(urls.post.signup, values).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    localStorage.setItem('user', JSON.stringify(data.user))
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