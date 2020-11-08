import React from 'react';

import Header from "../src/Components/Header/Header.js";
import Table from '../src/Components/Table/Table.js';

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      searchString: "",
      filtered: [],
      openFilterMenu: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }  

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    const apiUrl = 'https://code-challenge.spectrumtoolbox.com/api/restaurants';
    return fetch(apiUrl, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Api-Key q3MNxtfep8Gt',
         }
  
      })
      .then((response) => response.json())
      .then((restaurants) => {
      // sort by name, no filter required on name so sorted here
      restaurants.sort(function(a, b) {
        let prevName = a.name.toUpperCase(); // ignore upper and lowercase
        let nextName = b.name.toUpperCase(); // ignore upper and lowercase
        if (prevName < nextName) {
          return -1;
        }
        if (prevName > nextName) {
          return 1;
        }
        return 0;
      });
        this.setState({ restaurants: restaurants, filtered: restaurants });
      });
  };

  handleFilterMenuButton = () => {
    this.setState(state => {
      return {
        openFilterMenu: !state.openFilterMenu,
      };
    });
  };

  onInputChange(restaurant){
    if(restaurant){
      this.setState({searchString: restaurant})
    }
  }

  //@TODO: HANDLE SEARCHABILITY 
  //   // handleSearchChange = event => {
    //search results should filter name, city or genre and return 10 
//   //   this.setState({
//   //     filteredTable: filterRestaurants(event.target.value, 10)
//   //   });
//   // };

  resetSearch = () =>{
    this.setState({
      searchString: ''
    })
  }

  render() {
    return (
      <div className="App">
        <Header
         handleChange={this.onInputChange}
         searchString={this.state.searchString}
         resetSearch={this.resetSearch}
         restaurants={this.state.restaurants}
         openFilterMenu={this.state.openFilterMenu}
         handleFilterMenuButton={this.handleFilterMenuButton}
         />
        <div className="Main">
          <Table restaurants={this.state.restaurants}/>
        </div>
      </div>
    );
  }
}

export default App;