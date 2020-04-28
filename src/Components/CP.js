import React from 'react';
import Listing from "./Listing";
import User from "./Objects/EditForm";
import Fetch from "../Api/Fetch";

/**
 * Client control panel
 */

class CP extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items : [],
      itemOnEdit : null
    };
    this.getItems   = this.getItems.bind( this );
    this.updateItem = this.updateItem.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.editItem   = this.editItem.bind( this );
    this.resetEdit  = this.resetEdit.bind( this );
  
    this.getItems();
  }
  
  getItems(){
    new Fetch( 'clients' )
      .then( data => this.setState({ items: data }) )
      .catch( error => { console.error( error ) } )
  }
  
  updateItem( data ){
    new Fetch( '', 'PUT', data )
      .then( data => this.setState({ items: data, itemOnEdit: null }) )
      .catch( error => { console.error( error ) } )
  }
  
  deleteItem( o ){
    let data = {
      id : o.target.value
    };
    new Fetch( '', 'DELETE', data )
      .then( data => this.setState({ items: data }) )
      .catch( error => { console.error( error ) } )
  }
  
  editItem( o ){
    let { items } = this.state;
    document.getElementById('edit-car-form').scrollIntoView();
    this.setState({
      itemOnEdit : items.Items[ o.target.value ]
    });
  }
  
  resetEdit(){
    this.setState({
      itemOnEdit : null
    });
  }

  render() {
    let { items, itemOnEdit } = this.state;
    let { logout } = this.props;
    return (
        <div className={"control-panel"}>
          <h5 className={"cp-header"}>Clients and settings</h5>
          <Listing items={items} editItem={this.editItem} deleteItem={this.deleteItem}/>
          <User process={this.updateItem} reset={this.resetEdit} editing={itemOnEdit}/>
        </div>
    )
  }
}

export default CP