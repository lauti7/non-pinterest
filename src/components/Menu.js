import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavBar from './NavBar'
import {Link} from 'react-router-dom'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  color:{
    backgroundColor: '#ff5e68'
  },
  noneTxtDco:{
    textDecoration:'none',
    color: '#f4f4f4'
  }
});

const Menu = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar className={classes.color} position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link className={classes.noneTxtDco} to='/'>non-pinterest</Link>
          </Typography>
          <NavBar />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Menu)
