import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import Chip from '@material-ui/core/Chip';
import axios from 'axios'
import { urls } from "../../../global"

class Users extends Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        axios.get(urls.get.listUser, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            }
        }).then(response => {
            const { status, data } = response
            if (status === 200) {
                if (data.success) {
                    this.setState({users: data.users})
                }
            } 
        })
    }
    
    render() {
        const { users } = this.state
        return (
            <div>
                <h1>LISTE DES UTILISATEURS</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Pseudo</TableCell>
                                <TableCell>Adresse email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user._id}>
                                    <TableCell component="th" scope="row">
                                        {user._id}
                                    </TableCell>
                                    <TableCell>
                                        { user.role === 'admin' ? (
                                            <Chip
                                                icon={<StarIcon />}
                                                label={user.username}
                                                color="primary"
                                            />) : user.username }
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Users
