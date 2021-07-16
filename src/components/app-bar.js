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
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Login from './auth/login';
import Signup from './auth/signup';
import { useSelector, useDispatch } from 'react-redux'
import Profile from './user/profile/';
import { NavLink, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navItem: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 12,
        textDecoration: 'none',
        display: 'inline-block'
    },
    navItemText: {
        fontSize: 15,
        color: '#ffff',
    }
}));

export default function Navigation() {
    const classes = useStyles();
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignup, setOpenSignup] = React.useState(false);
    const [openProfile, setOpenProfile] = React.useState(false);
    
    const user = useSelector(state => state.userReducer.user)
    const snackbar = useSelector(state => state.userReducer.snackbar)
    const dispatch = useDispatch()

    const history = useHistory()

    dispatch({type: 'RESTORE_HISTORY', payload: { history }})
    
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

    const handleClickOpenProfile = () => {
        setOpenProfile(true);
    }

    const handleCloseProfile = () => {
        setOpenProfile(false);
    }

    const handleLogOut = () => { 
        localStorage.clear()
        dispatch({type: 'LOG_OUT'})
        history.push('/')
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type: 'CLOSE_SNACKBAR'});
    };

    const isAdmin = () => {
        return user && user.role === 'admin' ? true : false
    }
    

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit">
                        {isAdmin() ? <PermIdentityIcon /> : <StarIcon />}
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {user && user.role === 'admin' ? user.username : 'Voitures Electriques'}
                    </Typography>
                    <div style={{ position: 'absolute', right: 20 }}>
                        {
                            user ?
                                isAdmin() ? (
                                    <>
                                        <div style={{ display: 'inline-block' }}>
                                            <NavLink to="/list-user" className={classes.navItem}>
                                                <Typography className={classes.navItemText}>
                                                    UTILISATEURS
                                                </Typography>
                                            </NavLink>
                                            <NavLink to="/list-car" className={classes.navItem}>
                                                <Typography className={classes.navItemText}>
                                                    VOITURES
                                                </Typography>
                                            </NavLink>
                                            <Button color="inherit" onClick={handleClickOpenProfile} style={{ marginRight: 10 }}>Profile</Button>
                                        </div>
                                        <Button variant="contained" color="secondary" onClick={handleLogOut}>Deconnexion</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button color="inherit" onClick={handleClickOpenProfile} style={{ marginRight: 10 }}>{user.username}</Button>
                                        <Button variant="contained" color="secondary" onClick={handleLogOut}>Deconnexion</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button color="inherit" onClick={handleClickOpenSignup}>Créer un compte</Button>
                                        <Button variant="outlined" color="inherit" onClick={handleClickOpenLogin}>Connexion</Button>
                                    </>
                                )
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Login open={openLogin} handleClose={handleCloseLogin} />
            <Signup open={openSignup} handleClose={handleCloseSignup} />
            <Profile open={openProfile} handleClose={handleCloseProfile} />
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
