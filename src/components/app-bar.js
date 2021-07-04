import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import Login from './auth/login';
import Signup from './auth/signup';
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function Navigation() {
    const classes = useStyles();
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    
    const user = useSelector(state => state.authReducer.user)
    const snackbar = useSelector(state => state.authReducer.snackbar)
    const dispatch = useDispatch()

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    }

    const handleCloseLogin = () => {
        setOpenLogin(false);
    }

    const handleClickOpenSignup = () => {
        setOpenSignup(true);
    }

    const handleCloseSignup = () => {
        setOpenSignup(false);
    }

    const handleLogOut = () => { 
        localStorage.clear()
        dispatch({type: 'LOG_OUT'})
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type: 'CLOSE_SNACKBAR'});
      };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit">
                        <StarIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Voitures Electriques
                    </Typography>
                    <div style={{position: 'absolute', right: 20}}>
                        {
                            user ? (
                                <>
                                    <Button color="inherit" style={{marginRight: 10}}>{user.username}</Button>
                                    <Button variant="contained" color="secondary" onClick={handleLogOut}>Deconnexion</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={handleClickOpenSignup}>Créer un compte</Button>
                                    <Button variant="outlined" color="inherit"  onClick={handleClickOpenLogin}>Connexion</Button>
                                </>
                            )
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Login open={openLogin} handleClose={handleCloseLogin} />
            <Signup open={openSignup} handleClose={handleCloseSignup} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={snackbar ? true : false}
                autoHideDuration={5000}
                onClose={handleCloseSnackBar}
                message={snackbar}
                action={
                    <React.Fragment>
                        <IconButton onClick={handleCloseSnackBar} size="small" aria-label="close" color="inherit">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
