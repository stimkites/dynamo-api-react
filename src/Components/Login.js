import React from 'react';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.defaults = {
      email: '',
      pass: ''
    };
    this.state = this.defaults;
    this.processForm = this.processForm.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  setValue( o ){
    let newState = {};
    newState[ o.target.id ] = o.target.value;
    this.setState( newState );
  }

  processForm( e ){
    this.props.process( this.state );
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  render() {
    let { email, pass } = this.state;
    let { error } = this.props;
    return (
        <div className={"edit-form-wrap"} id={"edit-car-form"}>
          <h5 className={"login-header"}>Login</h5>
          <form onSubmit={this.processForm} onReset={this.resetForm} className={"edit-form"}>
              <label>Login/email: <input onChange={this.setValue} type={"email"} id={"email"} value={email} /></label>
              <label>Password: <input onChange={this.setValue} type={"password"} id={"pass"} value={pass} /></label>
              <button type={"submit"}>Login</button>
          </form>
          <div className={"login-errors"} id={"login-errors"}>{error}</div>
        </div>
    )
  }
}

export default Login