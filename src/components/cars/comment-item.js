import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import FaceIcon from '@material-ui/icons/Face';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment'
import 'moment-timezone'
import { connect } from 'react-redux'
import ModalConfirm from './modal-confirm';

class CommentItem extends Component {

    state = {
        openConfirm: false,
    }

    deleteButton = (idUserComment) => {
        const { user } = this.props
        if (user) {
            if (user._id === idUserComment) {
                return (
                    <IconButton onClick={() => this.setState({openConfirm: true})}>
                        <DeleteIcon />
                    </IconButton>
                )
            }
        }
        return null
    }

    handleOpenModal = openConfirm => this.setState({openConfirm})

    render() {
        const { openConfirm } = this.state
        const { comment } = this.props
        return (
            <>
                <div style={{padding: 20, paddingBottom: 0, display: 'flex'}}>
                    <div>
                        <FaceIcon />
                    </div>
                    <div style={{marginLeft: 10, width: '100%'}}>
                        <Typography variant="body2" style={{fontWeight: 'bold'}}>{ comment.username }</Typography>
                        <Typography variant="caption" component="p" style={{fontSize: 10}}>
                            <Moment fromNow date={comment.commented_at} />
                        </Typography>
                        <Typography variant="caption">{ comment.comment }</Typography>
                    </div>
                    <div style={{padding: 0, display: 'flex', alignItems: 'center'}}>
                        { this.deleteButton(comment.id_user) }
                    </div>
                </div>
                <ModalConfirm 
                    open={openConfirm} 
                    handleClose={this.handleOpenModal} 
                    comment={comment} 
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(CommentItem)
