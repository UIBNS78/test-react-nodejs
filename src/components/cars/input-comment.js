import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Formik } from 'formik'
import { CommentSchema } from '../../schemas/input-schema'
import { connect } from 'react-redux'
import { addCommentAction } from '../../redux/actions/car-action'

class InputComment extends Component {

    state = {
        alert: null
    }
    
    handleSubmit = (values, action) => {
        const { idCar, user, addComment } = this.props
        const data = {
            id_car: idCar,
            id_user: user._id,
            username: user.username,
            comment: values.comment
        }

        // ADD COMMENT
        addComment(data, this.handleSetAlert, action)
    }
    
    handleSetAlert = (alert) => this.setState({alert})

    render() {
        const { alert } = this.state
        return (
            <div style={{padding: 20, paddingBottom: 0}}>
                { alert && <Alert severity={alert.type} style={{marginBottom: 15}}>{ alert.message }</Alert> }
                <Formik
                    initialValues={{comment: ''}}
                    validationSchema={CommentSchema}
                    onSubmit={(values, action) => {
                        this.handleSubmit(values, action)
                    }}
                >
                    {formikProps => (
                        <div style={{display: 'flex'}}>
                            <TextField
                                label="Commentaire"
                                fullWidth
                                variant="outlined"
                                value={formikProps.values.comment}
                                onChange={formikProps.handleChange('comment')}
                            />
                            <Button 
                                variant="contained" 
                                color="primary" 
                                style={{marginLeft: 10}}
                                onClick={formikProps.handleSubmit}
                            >Commenter</Button>
                        </div>
                    )}
                </Formik>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (data, handleSetAlert, action) => dispatch(addCommentAction(data, handleSetAlert, action))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputComment)
