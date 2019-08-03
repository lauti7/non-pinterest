import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {PermIdentity, Search, ExitToApp, AlternateEmail} from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import auth from '../auth'


const styles = theme => ({
  nav:{
    [theme.breakpoints.only('sm')]: {
      maxWidth: '350px',
    },
    [theme.breakpoints.only('xs')]: {
      maxWidth: '300px',
    },
  },
  itemNavBar:{
    [theme.breakpoints.only('xs')]: {
      fontSize: '0.6rem',
    },
    [theme.breakpoints.only('sm')]: {
      fontSize: '0.8rem',
    },
  },
  noneTxtDco:{
    textDecoration:'none',
    color: '#f4f4f4',
  }
})



const NavBar = (props) => {
  const {classes} = props


  const checkIsAuthenticated = () => {
    // console.log(auth)
    if (!auth.isAuthenticated()) {
      return (
        <>
          <ListItemText inset>
            <Link className={classes.noneTxtDco} to='/login'>
                <Button className={classes.itemNavBar} color="inherit">
                  Entrar <PermIdentity />
                </Button>
            </Link>
          </ListItemText>
          <ListItemText inset>
            <Link className={classes.noneTxtDco} to='/register'>
                <Button className={classes.itemNavBar} color="inherit">
                  Registrate <AlternateEmail />
                </Button>
            </Link>
          </ListItemText>
        </>

      )
    } else {
      return (
        <>
          <ListItemText inset>
            <Link className={classes.noneTxtDco} to='/profile'>
                <Button className={classes.itemNavBar} color="inherit">
                  Perfil <PermIdentity />
                </Button>
            </Link>
          </ListItemText>
          <ListItemText inset>
            <Link className={classes.noneTxtDco} to='/'>
              <Button className={classes.itemNavBar} color="inherit" onClick={() => {auth.logout(() => props.history.push('/'))}}>
                Salir <ExitToApp />
              </Button>
            </Link>
          </ListItemText>

        </>
      )
    }

  }


    return (
        <List className={classes.nav} component="nav">
            <ListItem component="div" >
              <ListItemText inset>
                <Link className={classes.noneTxtDco} to='/search'>
                    <Button className={classes.itemNavBar} color="inherit">
                      Buscar <Search />
                    </Button>
                </Link>
              </ListItemText>
              {checkIsAuthenticated()}
            </ListItem >
        </List>
    )
}


export default withStyles(styles)(withRouter(NavBar));
