import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import User from './components/User'
import Search from './components/Search'
import Menu from './components/Menu'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div>
      <Menu />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users/:userName" component={User} />
          <Route exact path="*" component={() => '404 not found'} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
