import React from 'react';

import './Table.css';

export default class Table extends React.Component{
  renderTableHeader(){
    // @ToDO: Make dynamic, IF time
    // let restaurantKeys = Object.keys(this.props.restaurants[1])  
    return (
      <>
      <th>
      Name
      </th>
      <th>City</th>
      <th>State</th>
      <th>Telephone</th>
      <th>Genre</th>
      </>
    )
  };

  //filter state and genre
  renderTableFilter(item){
    return this.props.restaurants.map(restaurant => {
      const { id, state, genre } = restaurant;
      //style genres a bit, take out of list format -- just personal choice, no feature request
      var genreArray = genre.split(',');
   
      return (
          <tr key={id} >
            <td>{state}</td>
            <td className="genreContainer">
              {genreArray.map(genre => <ul>{genre}</ul>)}
            </td>
          </tr>
      )
    })
  };

  renderTableData = () => {
    return this.props.restaurants.map(restaurant => {
      const { id, name, city, state, telephone, genre } = restaurant;
      //style genres a bit, take out of list format -- just personal choice, no feature request
      var genreArray = genre.split(',');
   
      return (
          <tr key={id} >
            <td>{name}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{telephone}</td>
            
            <td className="genreContainer">
              {genreArray.map(genre => <ul className={genre}>{genre}</ul>)}
            </td>
          </tr>
      )
    })
  };

  render(){
    return (
      <div>
        <table id="table">
          <tbody>
            <tr>
              {this.renderTableHeader()}
            </tr>
              {this.renderTableData()}
          </tbody>
        </table>
      </div>
    )
  }
};