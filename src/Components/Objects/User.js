import React from 'react';

class User extends React.Component {
    constructor(props) {
      super(props);
      this.defaults = {
        id: 0,
        type: 'car',
        name: '',
        manufacturer: '',
        fuel: 'gasoline',
        description: ''
      };
      this.state = this.defaults;
      this.processForm = this.processForm.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.setValue = this.setValue.bind(this);
    }

    setValue( o ){
      let newState = {}, { editing } = this.props;
      newState[ o.target.id ] = o.target.value;
      this.setState( newState );
      if( editing )
        editing[o.target.id] = o.target.value;
    }

    processForm( e ){
      let { editing } = this.props;
      this.props.process( editing || this.state );
      this.setState(this.defaults);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    resetForm( e ){
      let { reset } = this.props;
      reset();
      this.setState(this.defaults);
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    render() {
      let { editing } = this.props;
      let { id, type, name, manufacturer, fuel, description } = editing || this.state;
      return (
          <div className={"edit-form-wrap"} id={"edit-user-form"}>
            <h5>User</h5>

          </div>
      )
    }
}

export default User