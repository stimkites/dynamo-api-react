import React from 'react';

/**
 * Form is used to render any edit form
 *
 * Usage:
 * <Form    controls={ [
 *              {
 *                  type: 'select',
 *                  id: '',
 *                  options: {},
 *                  value: '',
 *                  label: '',
 *                  wrap_class: '',
 *                  class: ''
 *              },
 *              {
 *                  type: 'text',
 *                  id: '',
 *                  value: '',
 *                  label: '',
 *                  wrap_class: '',
 *                  class: ''
 *              }
 *              ...
 *          ] }
 *          title={''}
 *          id={''}
 *          process={}
 *          />
 */


class Form extends React.Component {
    constructor(props) {
      super(props);
      this.defaults = this.props.controls;
      this.state = this.defaults;
      this.processForm = this.processForm.bind(this);
      this.resetForm = this.resetForm.bind(this);
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

    resetForm( e ){
      this.setState( this.defaults );
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    render() {

      let { className, id, title } = this.props, { state } = this, controls = [], options = [];

      for( const c of state )

        switch( c.type ){

            case 'select':
                for( let i in c.options )
                    options.push(<option value={i} key={"option-" + i} selected={c.value === i}>c.options[i]</option>);
                controls.push(
                    <div className={c.wrap_class} key={"select-" + c.id}>
                        <label>c.label<br/>
                            <select name={c.id} id={c.id} className={c.class} {c.attributes}>{options}</select>
                        </label>
                    </div>
                );
            break;

            case 'radio':
                for( let i in c.options )
                    options.push(
                        <label>
                            <input className={c.class} type={"radio"} key={"radio-" + i} name={c.id} value={i} />
                            {c.options[i]}
                        </label>
                    );
                controls.push(
                    <fieldset key={"radiogroup-" + c.id} className={c.wrap_class} {c.attributes}>
                        <legend>{c.label}</legend>{options}
                    </fieldset>
                );
            break;

            case 'multi':
                for( let i in c.options )
                    options.push(
                        <label>
                            <input className={c.class} type={"checkbox"} key={"multi-" + i} checked={c.value === i} name={i} value={i} />
                            {c.options[i]}
                        </label>
                    );
                controls.push(<fieldset className={c.wrap_class} key={"multi-wrap-" + c.id} {c.attributes}><legend>{c.label}</legend>{options}</fieldset>);
            break;

            case 'checkbox':
                controls.push(
                    <label className={c.wrap_class} key={"checkbox-" + c.id} {c.attributes}>
                        <input type={"checkbox"} className={c.class} checked={c.value === 'yes'} id={c.id} name={c.id} value={"yes"} />
                        {c.label}
                    </label>
                );
            break;

            case 'textarea':
                controls.push(
                    <label className={c.wrap_class} {c.attributes} key={"textarea-" + c.id}>
                        {c.label}<br/>
                        <textarea className={c.class} name={c.id} id={c.id}>c.value</textarea>
                    </label>
                );
            break;

            default:
                controls.push(
                    <label className={c.wrap_class} key={"checkbox-" + i}>
                        {c.label}<br/>
                        <input type={c.type} {c.attributes} className={c.class} name={c.id} id={c.id} value={c.value} />
                    </label>
                );
            break;

        }



      return (
          <div className={"edit-form-wrap"}>
            <h5>{title}</h5>
            <form onSubmit={this.processForm} id={id} onReset={this.resetForm} className={className}>
              {controls}
              <button type={"submit"}>Save</button>
              <button type={"reset"}>Cancel</button>
            </form>
          </div>
      )
    }
}

export default Form