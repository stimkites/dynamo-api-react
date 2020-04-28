import React, { Component } from 'react';
import logo from '../public/img/logo.svg';
import './Css/App.css';
import Fetch from './Api/Fetch';
import Login from "./Components/Login";
import CP from "./Components/CP";
import UP from "./Components/UP";

/**
 * Main App
 */
class App extends Component {

  constructor( props ){
    super( props );
    this.state = {
      authenticated : null,
      id : localStorage.getItem( 'auth_token' ) || '',
      error: '',
      users: false
    };
    this.getToken   = this.getToken.bind( this );
    this.auth       = this.auth.bind( this );
    this.handleError= this.handleError.bind( this );
    this.setAuth    = this.setAuth.bind( this );
    this.logout     = this.logout.bind( this );
    this.users      = this.users.bind( this );

    this.getToken();
  }
  
  setAuth( data ){
    if( data.authenticated )
      localStorage.setItem( 'auth_token', data.id );
    else
      data.error = "Incorrect credentials";
    this.setState( data );
  }

  handleError( error ){
    console.error( error );
    this.setState( { error: error } );
  }
  
  getToken(){
    new Fetch( 'tokens', 'PUT', { id: this.state.id } )
      .then( data => this.setState( data ) )
      .catch( error => this.handleError( error ) )
  }
  
  auth( data ){
    let { id } = this.state;
    if( ! id )
      return this.setState( { error: "Undefined auth token! Refresh page..." } );
    new Fetch( 'auth', 'POST', { credentials: data, id: id } )
      .then( data => this.setAuth( data ) )
      .catch( error => this.handleError( error ) )
  }
  
  logout(){
    localStorage.clear();
    this.setState({
      authenticated : false,
      id : '',
      error: ''
    });
  }

  users( e ){
    this.setState({
        users: e.target.getAttribute('data-show')
    })
  }

  render() {
    let { authenticated, error, users } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Sitoo CP</h2>
          <p className={"description"}>This is an example of remote Sitoo + Woo integration</p>
        </div>
        <div className={"content"}>
          { authenticated === null
            ? <div className={"loading"} />
            : authenticated
              ? <div className={"authorized-content"}>
                  <div className={"logout"}>
                      <span className={"auth-enail"} ><a href={"#"} onClick={this.users} data-show="true">{authenticated}</a></span>
                    <button className={"logout-button"} title={"Logout"} onClick={this.logout} />
                  </div>
                  { users ? <UP/> : <CP/> }
                </div>
              : <Login process={this.auth} error={error}/> }
        </div>
      </div>
    );
  }
}

export default App;
