import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import { UpdateSchema } from '../../../schemas/input-schema'
import { connect } from 'react-redux'
import { updateUserAction } from '../../../redux/actions/user-action'

class FormTab extends Component {

    render() {
        const { handleSetAlert, handleCloseModal, user, updateUser } = this.props
        return (
            <div>
                <Formik
                    initialValues={{username: user && user.username, email: user && user.email}}
                    validationSchema={UpdateSchema}
                    onSubmit={(values) => {
                        handleSetAlert(null, false)
                        updateUser(values, handleSetAlert, handleCloseModal)
                    }}
                >
                    {formikProps => (
                        <>
                            <TextField
                                autoFocus
                                label="Pseudo"
                                type="text"
                                value={formikProps.values.username}
                                onChange={formikProps.handleChange('username')}
                                onBlur={formikProps.handleBlur('username')}
                                error={formikProps.touched.username && formikProps.errors.username ? true : false}
                                fullWidth
                            />
                            <TextField
                                label="Adresse Email"
                                type="email"
                                value={formikProps.values.email}
                                onChange={formikProps.handleChange('email')}
                                onBlur={formikProps.handleBlur('email')}
                                error={formikProps.touched.email && formikProps.errors.email ? true : false}
                                fullWidth
                                style={{marginTop: 10}}
                            />
                            <TextField
                                label="Rôle"
                                type="text"
                                value={user && user.role}
                                disabled
                                fullWidth
                                style={{marginTop: 10}}
                            />
                            <Button 
                                onClick={formikProps.handleSubmit}
                                disabled={!formikProps.isValid}
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                style={{marginTop: 20}}
                            >Modifier</Button>
                        </>
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
        updateUser: (values, handleSetAlert, handleClose) => dispatch(updateUserAction(values, handleSetAlert, handleClose))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormTab)