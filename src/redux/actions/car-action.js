import { urls, messages } from "../../global"
import axios from 'axios'

export const AddCarAction = (car, handleSetAlert, action) => {
    return (dispatch, getState) => {
        axios.post(urls.post.addCar, car, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        }).then(response => {
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

export const addCommentAction = (comment, handleSetAlert, action) => {
    return (dispatch, getState) => {
        axios.post(urls.post.addComment, comment, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        }).then(response => {
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
        axios.post(urls.post.removeComment, comment, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        }).then(response => {
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

export const removeCarAction = (id, handleClose, handleSetAlert) => {
    return (dispatch, getState) => {
        axios.get(urls.get.removeCar(id), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        }).then(response => {
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