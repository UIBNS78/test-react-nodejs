import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { removeCarAction } from '../../../redux/actions/car-action'

class ModalConfirm extends Component {

    state = {
        alert: null
    }
    
    handleRemove = () => {
        const { handleClose, id, removeCar } = this.props
        removeCar(id, handleClose, this.handleSetAlert)
    }
    
    handleSetAlert = (alert) => this.setState({alert})
    
    render() {
        const { alert } = this.state
        const { open, handleClose } = this.props
        return (
            <Dialog open={open}>
                <DialogContent>
                    <DialogTitle>Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Cette action est irréversible,
                            vous êtes sûr de vouloir supprimer ce commentaire ?
                            { alert && <Alert severity={alert.type} style={{marginBottom: 10}}>{ alert.message }</Alert> }
                        </DialogContentText>
                    </DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose(false)
                        this.handleSetAlert(null)
                    }}>Annuler</Button>
                    <Button color="secondary" onClick={this.handleRemove}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCar: (comment, handleClose, handleSetAlert) => dispatch(removeCarAction(comment, handleClose, handleSetAlert)) 
    }
}

export default connect(null, mapDispatchToProps)(ModalConfirm)
