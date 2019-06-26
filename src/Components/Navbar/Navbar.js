import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Auth from '../Auth/Auth';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles(theme => ({

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },

  icon: {
    color: 'white'
  },

  title: {
    marginLeft: '1em'
  },

  navbar: {
    backgroundColor: '#141F43'
  },

  button: {
    color: 'white'
  }

}));

const Navbar = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const Login = () => {
  //   console.log('LOGIN FUNCTION')
  //   return <Auth />
  // }

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>

        <div>
          <Button onClick={handleOpen} className={classes.button}>Login // Signup</Button>
          <Modal
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div style={modalStyle} className={classes.paper}>
              <Auth storeToken={props.storeToken}/>
            </div>
          </Modal>
        </div>
        
        
        {/* <div>
          <Button onClick={handleOpen} className={classes.button}>Help</Button>
          <Modal
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
          >
            <div style={modalStyle} className={classes.paper}>
              <h3>Onyomi</h3>
              <h3>Kunyomi</h3>
            </div>
          </Modal>
        </div> */}


      </Toolbar>
    </AppBar>


  );
};

export default Navbar;