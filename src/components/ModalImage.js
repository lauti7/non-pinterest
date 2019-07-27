import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import {CropOriginal} from '@material-ui/icons'


const styles = theme => ({
  paper: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '66.6%',
    outline: 'none',
  },
  imgIcon: {
    color: 'rgb(255, 255, 255)',
    '&:hover': {
      color: 'rgb(61, 236, 94)',
    },
  },
  container:{
    width: '90%',
    margin: 'auto',
    padding: '5px 0'
  },
  img:{
    width:'100%',
  }
});

class ModalImage extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <IconButton onClick={this.handleOpen} >
          <CropOriginal className={classes.imgIcon}  />
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <div className={classes.container}>
              <img className={classes.img} src={this.props.img} alt=""/>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}



export default withStyles(styles)(ModalImage);
