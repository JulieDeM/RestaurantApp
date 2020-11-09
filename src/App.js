import React from 'react';

import Header from "../src/Components/Header/Header.js";
import Table from '../src/Components/Table/Table.js';

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      filteredRestaurants: [],
      searchString: "",
      enteredText: "",
      filtered: [] ,
      openFilterMenu: false,
      restaurantPagination: null,
      total: null,
      pagesNeeded: null,
      perPage: 10,
      currentPage: 1,
      checkedAllStates: "checked",
      filters: [],
      genre: [],
      state: [],
      activeFilter: []
    };
    this.fetchData = this.fetchData.bind(this);
  }  

  componentDidMount(){
    this.fetchData();
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
      //determine number of pages needed for 10 results each page minimum
      const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(restaurants.length / 10); i++) {
            pageNumbers.push(i);
        }

    //get current restaurants
    const indexOfLastRestaurant = 1 * 10;
    const indexOfFirstRestaurant = indexOfLastRestaurant - 10;
    const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant );

        this.setState({ 
          restaurants: restaurants,
          filtered: restaurants,
          filteredRestaurants: restaurants,
          restaurantPagination: restaurants,
          total: restaurants.length,
          perPage: 10,
          pagesNeeded: pageNumbers,
          currentPage: 1,
          filterList: restaurants,
          currentRestaurants: currentRestaurants
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

  handleSearch(event){
    // console.log(event.type)
    // let code = event.keyCode || event.which;
    // console.log(code)
    // if(event.type === 'click' || event.type === 'onKeyPress'){
    // if(code === 13 || event.type === 'click' ) { //13 is the enter keycode
    let filteredRestaurants = this.state.restaurants.filter( restaurant => {
      return restaurant.name.indexOf(this.state.searchString) !== -1 
      || restaurant.genre.indexOf(this.state.searchString) !== -1 
      || restaurant.state.indexOf(this.state.searchString) !== -1
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRestaurants.length / 10); i++) {
        pageNumbers.push(i);
    }
    this.setState({
      searchString: event.target.value.substr(0, 20),
      enteredText: event.target.value.substr(0, 20),
      filteredRestaurants: filteredRestaurants,
      pagesNeeded: pageNumbers
    })
    // }
  };

  onInputChange(event){
    // console.log(event.type)
     //@TODO: HANDLE SEARCH BUTTON
    let code = event.keyCode || event.which;
    if(code === 13 || event.type === 'click' ) { //13 is the enter keycode
    let filteredRestaurants = this.state.restaurants.filter( restaurant => {
      return restaurant.name.toLowerCase().indexOf(this.state.searchString) !== -1 
      || restaurant.genre.toLowerCase().indexOf(this.state.searchString) !== -1 
      || restaurant.state.toLowerCase().indexOf(this.state.searchString) !== -1
      || restaurant.city.toLowerCase().indexOf(this.state.searchString) !== -1
    });
    this.setState({
      searchString: event.target.value.substr(0, 20),
      enteredText: event.target.value.substr(0, 20),
      filteredRestaurants: filteredRestaurants
    })
    }
  };

  onEnteredText(event){
    this.setState({enteredText:event.target.value.substr(0, 20) })
  };

  resetSearch = () =>{
    this.setState({
      searchString: '',
      enteredText: '',
      filteredRestaurants: this.state.restaurants
    })
  };

   //@TODO: FILTERING 
  filterResults(type, val){
    // console.log(type)
    const { genre, state } = this.state;
    // this.state.restaurants.filter(val => {
    //   return (genre.length && genre.includes(val.genre)) ||
    //   (state.length && state.includes(val.state)) 
    //   })
    // };
    let filteredRestaurants = this.state.filteredRestaurants.filter( restaurant => {
      return restaurant.name.indexOf(genre) !== -1 
      || restaurant.genre.indexOf(state) !== -1 
    });
    // this.setState({
    //   // genre: val,
    //   filteredRestaurants: filteredRestaurants
    // })
  };

   //@TODO: FILTERING 
  onFilterChange(filter) {
    const { filterList, activeFilter } = this.state;
    if (filter === "ALL") {
      if (activeFilter.length === filterList.length) {
        this.setState({ activeFilter: [] });
      } else {
        this.setState({ activeFilter: filterList.map(filter => filter.value) });
      }
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        this.setState({ activeFilter: newFilter });
      } else {
        this.setState({ activeFilter: [...activeFilter, filter] });
      }
    }
  }

  changePage(pageNumb){
    this.setState({
      currentPage: pageNumb
    })
  }
  
  render() {
    //get current restaurants
    const indexOfLastRestaurant = this.state.currentPage * this.state.perPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - this.state.perPage;
    const currentRestaurants = this.state.filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant );


    //@TODO: FILTERING 
    //filtering 
    const { filterList, activeFilter } = this.state;
    let filteredList;
    if (
      activeFilter.length === 0 ||
      activeFilter.length === filterList.length
    ) {
      filteredList = this.state.restaurants;
    } else {
      filteredList = this.state.restaurants.filter(item =>
        this.state.activeFilter.includes(item.state)
      );
    }
    return (
      <div className="App">
        <Header
         handleChange={this.onInputChange.bind(this)}
         searchString={this.state.searchString}
         enteredText={this.state.enteredText}
         handleTextChange={this.onEnteredText.bind(this)}
         resetSearch={this.resetSearch}
         restaurants={this.state.restaurantPagination}
         openFilterMenu={this.state.openFilterMenu}
         handleFilterMenuButton={this.handleFilterMenuButton}
         checkedAllStates={this.state.checkedAllStates}
         handleSearch={this.handleSearch.bind(this)}
         filterResults={this.onFilterChange.bind(this)}
         activeFilter={activeFilter}
         filterList={filterList}
         />
        <div className="Main">
          <Table 
          restaurants={currentRestaurants}
          fetchData={this.fetchData}
          pagesNeeded={this.state.pagesNeeded}
          currentPage={this.state.currentPage}
          changePage={this.changePage.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;