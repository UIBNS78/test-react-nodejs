import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik'
import { SignupSchema } from '../../schemas/input-schema'
import { connect } from 'react-redux'
import { signupAction } from '../../redux/actions/auth-action'

export class Signup extends Component {

    state = {
        loading: true,
        alert: null
    }

    handleSetAlert = (alert, loading) => this.setState({alert, loading})

    handleCloseModal = () => {
        this.setState({alert: null}, () => this.props.handleClose())
    }
    
    render() {
        const { alert, loading } = this.state
        const { open, signup } = this.props
        return (
            <div>
                <Dialog open={open} aria-labelledby="title-dialog">
                    <LinearProgress hidden={loading} />
                    <DialogTitle id="title-dialog">Créer un compte</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veuillez renseigner ces champs pour créer votre compte et commenter la liste des voitures éléctrique
                        </DialogContentText>
                        { alert && <Alert severity={alert.type} style={{marginBottom: 10}}>{ alert.message }</Alert> }
                        <Formik
                            initialValues={{username: '', email: '', password: '', confirm: ''}}
                            validationSchema={SignupSchema}
                            onSubmit={(values, action) => {
                                this.setState({loading: false})
                                signup(values, this.handleSetAlert, this.handleCloseModal, action)
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
                                        label="Mots de passe"
                                        type="password"
                                        value={formikProps.values.password}
                                        onChange={formikProps.handleChange('password')}
                                        onBlur={formikProps.handleBlur('password')}
                                        error={formikProps.touched.password && formikProps.errors.password ? true : false}
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
                                    >Creer</Button>
                                    <Button 
                                        onClick={this.handleCloseModal} 
                                        fullWidth 
                                        color="inherit"
                                        style={{marginTop: 10, marginBottom: 10}}
                                    >Annuler</Button>
                                </>
                            )}
                        </Formik>
                        
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (values, handleSetAlert, handleClose, action) => dispatch(signupAction(values, handleSetAlert, handleClose, action))
    }
}

export default connect(null, mapDispatchToProps)(Signup)
