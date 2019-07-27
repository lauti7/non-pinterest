import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    margin:'auto'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },

})

const InputSearch = (props) => {
  const {classes} = props
  return (
  <div style={{margin:10}}>
    <Paper className={classes.paper} elevation={1}>
      <InputBase
        id="search"
        placeholder='Buscar imagenes'
        value={props.inputSearch}
        onChange={props.handleChange}
        className={classes.input}
      />
      <IconButton className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
    </Paper>
  </div>
)}

export default withStyles(styles)(InputSearch)
