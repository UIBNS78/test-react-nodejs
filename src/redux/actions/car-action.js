import { urls, messages } from "../../global"
import axios from 'axios'

export const addCommentAction = (comment, handleSetAlert, action) => {
    return (dispatch, getState) => {
        axios.post(urls.post.addComment, comment).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    dispatch({type: 'CAR_LIST', payload: { cars: data.cars }})
                    action.resetForm()
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

export const removeCommentAction = (comment, handleClose, handleSetAlert) => {
    return (dispatch, getState) => {
        axios.post(urls.post.removeComment, comment).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    dispatch({type: 'CAR_LIST', payload: { cars: data.cars }})
                    handleClose(false)
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