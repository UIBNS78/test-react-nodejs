import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik'
import { LoginSchema } from '../../schemas/input-schema';
import { connect } from 'react-redux'
import { loginAction } from '../../redux/actions/auth-action'

export class Login extends Component {

    state = {
        loading: true,
        alert: null
    }
    
    handleSetAlert = (alert, loading) => this.setState({alert, loading})

    handleCloseModal = () => {
        this.setState({alert: null}, () => this.props.handleClose())
    }
    
    render() {
        const { loading, alert } = this.state
        const { open, login } = this.props
        return (
            <div>
                <Dialog open={open} aria-labelledby="title-dialog">
                    <LinearProgress hidden={loading} />
                    <DialogTitle id="title-dialog">Connexion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Veuillez renseigner ces champs pour pouvoir commenter la liste des voitures
                        </DialogContentText>
                        { alert && <Alert severity={alert.type} style={{marginBottom: 10}}>{ alert.message }</Alert> }
                        <Formik
                            initialValues={{username: '', password: ''}}
                            validationSchema={LoginSchema}
                            onSubmit={(values, action) => {
                                this.setState({loading: false})
                                login(values, this.handleSetAlert, this.handleCloseModal, action)
                            }}
                        >
                            {formikProps => (
                                <>
                                    <TextField
                                        autoFocus
                                        label="Pseudo"
                                        value={formikProps.values.username}
                                        onChange={formikProps.handleChange('username')}
                                        onBlur={formikProps.handleBlur('username')}
                                        error={formikProps.touched.username && formikProps.errors.username ? true : false}
                                        fullWidth
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
                                    <Button 
                                        onClick={formikProps.handleSubmit}
                                        disabled={!formikProps.isValid}
                                        variant="contained" 
                                        color="primary" 
                                        fullWidth 
                                        style={{marginTop: 20}}
                                    >Connexion</Button>
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
        login: (values, handleSetAlert, handleClose, action) => dispatch(loginAction(values, handleSetAlert, handleClose, action))
    }
}

export default connect(null, mapDispatchToProps)(Login)
