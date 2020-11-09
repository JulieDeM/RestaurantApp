import React from 'react';

import './Table.css';

export default class Table extends React.Component{
  renderTableHeader = () => {
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
  renderTableFilter = (item) => {
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
    console.log('this.props.restaurants')
    console.log(JSON.stringify(this.props.restaurants))
    console.log(this.props.restaurants.length)
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

  renderPagination = () => {
    this.props.pagesNeeded && this.props.pagesNeeded.map(num => {
      console.log('num')
      console.log(num)
      let activePage = this.props.currentPage === num ? 'active' : '';
   
      return (
        <span key={num} className={activePage} onClick={() => this.props.fetchData(num)}>{num}</span>
      );
    })
  }

  render(){
    console.log('this.props.pageNumbers')
    console.log(this.props.pagesNeeded)
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

        <div className='pagination'>
          {this.props.pagesNeeded && this.props.pagesNeeded.map(num => {
            console.log('num')
            console.log(num)
            let activePage = this.props.currentPage === num ? 'active' : '';
         
            return (
              <span key={num} className={activePage} onClick={() => this.props.fetchData(num)}>{num}</span>
            );
          })}
        </div>
      </div>
    )
  }
};