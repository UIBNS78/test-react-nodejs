import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import { urls } from "../../../global"
import AddCar from './add-car';
import { connect } from 'react-redux'
import ModalConfirm from './modal-confirm'

class Cars extends Component {

    state = {
        alert: null,
        loading: false,
        openConfirm: false
    }

    componentDidMount = () => {
        axios.get(urls.get.listCar).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    this.props.dispatch({type: 'CAR_LIST', payload: { cars: data.cars }})
                }
            }
        })
    }

    handleSetAlert = (alert, loading) => this.setState({alert, loading})

    handleOpenModal = openConfirm => this.setState({openConfirm})
    
    render() {
        const { alert, openConfirm } = this.state
        const { cars } = this.props
        return (
            <div>
                <h1>LISTE DES VOITURES</h1>
                <Typography variant="caption">Vous pouvez à la fois consulter la liste des voitures et aussi d'en ajouter</Typography>
                { alert && <Alert severity={alert.type} style={{marginBottom: 10}}>{ alert.message }</Alert> }
                <AddCar handleSetAlert={this.handleSetAlert} />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Nom</TableCell>
                                <TableCell align="center">Autonomie (Km)</TableCell>
                                <TableCell align="center">Puissance (Ch)</TableCell>
                                <TableCell align="center">Recharge (Km/h)</TableCell>
                                <TableCell align="center">Commentaires</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cars && cars.map(car => (
                                <TableRow key={car._id}>
                                    <TableCell component="th" scope="row">
                                        {car._id}
                                    </TableCell>
                                    <TableCell>{car.name}</TableCell>
                                    <TableCell align="center">{car.autonomy}</TableCell>
                                    <TableCell align="center">{car.power}</TableCell>
                                    <TableCell align="center">{car.reload}</TableCell>
                                    <TableCell align="center">{car.comments.length}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => this.setState({openConfirm: true})} color="secondary">
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </TableCell>
                                    <ModalConfirm 
                                        open={openConfirm} 
                                        handleClose={this.handleOpenModal} 
                                        id={car._id} 
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cars: state.carReducer.cars
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: payload => dispatch(payload)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cars)
