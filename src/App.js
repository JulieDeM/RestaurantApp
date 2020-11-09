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
      restaurantPagination: null,
      total: null,
      pagesNeeded: null,
      perPage: 10,
      currentPage: 1
    };
    this.fetchData = this.fetchData.bind(this);
  }  

  componentDidMount(){
    this.fetchData();
    // this.fetchData(1);
  }

  fetchData(pageNumb){
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
      console.log('this.state.restaurants.length')
      console.log(restaurants.length)
      //determine number of pages needed for 10 results each page minimum
      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(restaurants.length / 10); i++) {
            pageNumbers.push(i);
        }
        console.log('page numbers')
        console.log(pageNumbers)
        this.setState({ 
          restaurants: restaurants,
          filtered: restaurants,
          restaurantPagination: restaurants,
          total: restaurants.length,
          perPage: 10,
          pagesNeeded: pageNumbers,
          currentPage: pageNumb,
        });
      });
  };

  handleFilterMenuButton = () => {
    this.setState(state => {
      return {
        openFilterMenu: !state.openFilterMenu,
      };
    });
  };

  onInputChange(event){
    console.log('event')
    console.log(event)
    this.setState({searchString: event.target.value.substr(0, 20)})
    // if(restaurant){
    //   this.setState({searchString: restaurant})
    // }
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

//   setPage(page) {
//     let restaurants = this.props.items;
//     var pager = this.state.pager;

//     if (page < 1 || page > pager.totalPages) {
//         return;
//     }

//     // get new pager object for specified page
//     pager = this.getPager(items.length, page);

//     // get new page of items from items array
//     var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

//     // update state
//     this.setState({ pager: pager });

//     // call change page function in parent component
//     this.props.onChangePage(pageOfItems);
// }

  filter
  render() {
    let filteredRestaurants = this.state.restaurants.filter( restaurant => {
      return restaurant.name.indexOf(this.state.searchString) !== -1 
      || restaurant.genre.indexOf(this.state.searchString) !== -1 
      || restaurant.state.indexOf(this.state.searchString) !== -1
    });
    return (
      <div className="App">
        <Header
         handleChange={this.onInputChange.bind(this)}
         searchString={this.state.searchString}
         resetSearch={this.resetSearch}
        //  restaurants={this.state.restaurants}
        restaurants={this.state.restaurantPagination}
         openFilterMenu={this.state.openFilterMenu}
         handleFilterMenuButton={this.handleFilterMenuButton}
         />
        <div className="Main">
          <Table 
          restaurants={filteredRestaurants}
          fetchData={this.fetchData}
          pagesNeeded={this.state.pagesNeeded}
          currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default App;