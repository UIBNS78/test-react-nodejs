import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LockIcon from '@material-ui/icons/Lock';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { DialogActions } from '@material-ui/core';
import FormTab from './form-tab';
import FormPassTab from './form-pass-tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

class Profile extends Component {

    state = {
        loading: true,
        alert: null,
        tabValue: 0
    }

    handleSetAlert = (alert, loading) => this.setState({alert, loading})

    handleCloseModal = () => {
        this.setState({alert: null}, () => this.props.handleClose())
    }

    handleTab = (event, tabValue) => this.setState({tabValue})
    
    render() {
        const { alert, loading, tabValue } = this.state
        const { open } = this.props
        return (
            <div>
                <Dialog open={open} aria-labelledby="title-dialog">
                    <LinearProgress hidden={loading} />
                    <DialogTitle id="title-dialog">Votre profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pour apporter des modification à votre profile, veuillez cliquer sur le bouton modifier
                        </DialogContentText>
                        { alert && <Alert severity={alert.type} style={{marginBottom: 10}}>{ alert.message }</Alert> }
                        <Tabs
                            value={tabValue}
                            onChange={this.handleTab}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="forms-tab"
                        >
                            <Tab icon={<PersonPinIcon />} {...a11yProps(0)} />
                            <Tab icon={<LockIcon />} {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={tabValue} index={0}>
                            <FormTab handleSetAlert={this.handleSetAlert} handleCloseModal={this.handleCloseModal} />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <FormPassTab handleSetAlert={this.handleSetAlert} handleCloseModal={this.handleCloseModal} />
                        </TabPanel>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={this.handleCloseModal} 
                            fullWidth 
                            color="inherit"
                            style={{marginTop: -20, marginBottom: 10}}
                        >Annuler</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Profile
