import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik'
import { UpdatePassSchema } from '../../../schemas/input-schema'
import { connect } from 'react-redux'
import { updateUserPasswordAction } from '../../../redux/actions/user-action'

class FormPassTab extends Component {

    render() {
        const { handleSetAlert, handleCloseModal, updateUserPassword } = this.props
        return (
            <div>
                <Formik
                    initialValues={{oldPassword: '', newPassword: '', confirm: ''}}
                    validationSchema={UpdatePassSchema}
                    onSubmit={(values, action) => {
                        handleSetAlert(null, false)
                        updateUserPassword(values, handleSetAlert, handleCloseModal, action)
                    }}
                >
                    {formikProps => (
                        <>
                            <TextField
                                label="Ancien mots de passe"
                                type="password"
                                value={formikProps.values.oldPassword}
                                onChange={formikProps.handleChange('oldPassword')}
                                onBlur={formikProps.handleBlur('oldPassword')}
                                error={formikProps.touched.oldPassword && formikProps.errors.oldPassword ? true : false}
                                fullWidth
                                style={{marginTop: 10}}
                            />
                            <TextField
                                label="Mots de passe"
                                type="password"
                                value={formikProps.values.newPassword}
                                onChange={formikProps.handleChange('newPassword')}
                                onBlur={formikProps.handleBlur('newPassword')}
                                error={formikProps.touched.newPassword && formikProps.errors.newPassword ? true : false}
                                fullWidth
                                style={{marginTop: 10}}
                            />
                            <TextField
                                label="Resaisir le mots passe"
                                type="password"
                                value={formikProps.values.confirm}
                                onChange={formikProps.handleChange('confirm')}
                                onBlur={formikProps.handleBlur('confirm')}
                                error={formikProps.touched.confirm && formikProps.errors.confirm ? true : false}
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

const mapDispatchToProps = dispatch => {
    return {
        updateUserPassword: (values, handleSetAlert, handleClose, action) => dispatch(updateUserPasswordAction(values, handleSetAlert, handleClose, action))
    }
}

export default connect(null, mapDispatchToProps)(FormPassTab)
