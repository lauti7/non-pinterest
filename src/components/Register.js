import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import auth from '../auth'

const classes = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
});

class Register extends Component {
   state = {
     email: '',
     password: ''
  }

  componentDidMount(){
    if (auth.isAuthenticated()) {
      this.props.history.push('/profile')
    }
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }


  render(){
    return(
      <>
        <h1>Register</h1>
        <TextField
          id="email"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          className={classes.textField}
          margin="normal"
        />
        <br/>
        <TextField
          id="password"
          label="Password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          className={classes.textField}
          margin="normal"
        />
        <br/>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={ () => { auth.register(this.state.email, this.state.password, () => {
          this.props.history.push('/profile')
        }) } }>
          Register
        </Button>
      </>
    )
  }

}

export default Register
