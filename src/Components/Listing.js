import React from 'react';

class Listing extends React.Component {
    renderItems(){
      let content = [], { items, editItem, deleteItem } = this.props;
      let { Items, Count } = items, item;
      for( let i in Items )
        if( Items.hasOwnProperty( i ) ) {
          item = Items[i];
          content.push(
            <tr key={"car-" + item.id}>
              <td>{item.name}</td>
              <td>{item.manufacturer}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>{item.fuel}</td>
              <td>
                <button onClick={editItem} value={i}>Edit</button>
                <button onClick={deleteItem} value={item.id}>Delete</button>
              </td>
            </tr>
          );
        }
      return (
        <div className={"listing-wrapper"}>
          <h5 style={{float:'right'}}>Total: {Count}</h5>
          <table className={"list-table"}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Description</th>
                <th>Type</th>
                <th>Fuel</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {content}
            </tbody>
          </table>
        </div>);
    }

    render() {
      return (<div className={"list-cars"}>{this.renderItems()}</div>)
    }
}

export default Listing;